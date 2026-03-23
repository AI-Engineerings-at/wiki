"""
Create 5 ComfyUI UI-format workflow JSONs for Wiki/Social media use.

Workflows:
  W1: wiki-thumbnail.json     512x384,   20 steps, no upscale, Logo+Text
  W2: wiki-hero.json          1344x768,  34 steps, no upscale, Logo only
  W3: social-hq-v4.json       1344x1344, 34 steps, no upscale, Logo+Text
  W4: blog-hero-4k.json       1344x768,  34 steps, 4x NMKD AI upscale (cap 3840x2160), Logo only
  W5: ultra-4k.json           1344x1344, 34 steps, 4x NMKD AI upscale (cap 3840x2160), Logo+Text

Base config (all workflows):
  UNETLoader:     flux2_dev_fp8mixed.safetensors, fp8_e4m3fn
  CLIPLoader:     mistral_3_small_flux2_fp8.safetensors, type=flux2
  VAELoader:      flux2-vae.safetensors
  FluxGuidance:   3.0
  KSampler:       euler, beta, cfg=1.0
  AIEngLogoOverlay: logo-new.png, bottom-left, 12%, 3% padding, 0.85 opacity
  AIEngTextOverlay: SpaceGrotesk-Bold, 72, brand_blue, center/top

Format rules (from flux2-dev-social-hq.json reference):
  - pos and size are lists [x, y] and [w, h] — NOT objects
  - inputs: full defs with localized_name, widget, link, type
  - links: [link_id, src_node, src_slot, dst_node, dst_slot, "TYPE"]
  - widgets_values for KSampler: [seed, "randomize", steps, cfg, sampler, scheduler, denoise]
  - flags: {} on every node
  - NO frontendVersion in extra
  - STRING "False" not bool false for COMBO inputs
"""

import json
import os
import uuid


OUTPUT_DIR = "C:/Users/Legion/Documents/wiki/media/comfyui-workflows"

# ─────────────────────────── Node builders ────────────────────────────────────

def node_unet_loader(node_id: int, order: int, pos: list, out_links: list) -> dict:
    return {
        "id": node_id, "type": "UNETLoader",
        "pos": pos, "size": [324, 116.65625],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "unet_name", "name": "unet_name", "type": "COMBO",
             "widget": {"name": "unet_name"}, "link": None},
            {"localized_name": "weight_dtype", "name": "weight_dtype", "type": "COMBO",
             "widget": {"name": "weight_dtype"}, "link": None},
        ],
        "outputs": [
            {"localized_name": "MODEL", "name": "MODEL", "type": "MODEL",
             "slot_index": 0, "links": out_links},
        ],
        "properties": {"cnr_id": "comfy-core", "ver": "0.15.1", "Node name for S&R": "UNETLoader"},
        "widgets_values": ["flux2_dev_fp8mixed.safetensors", "fp8_e4m3fn"],
    }


def node_clip_loader(node_id: int, order: int, pos: list, out_links: list) -> dict:
    return {
        "id": node_id, "type": "CLIPLoader",
        "pos": pos, "size": [324, 148.65625],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "clip_name", "name": "clip_name", "type": "COMBO",
             "widget": {"name": "clip_name"}, "link": None},
            {"localized_name": "type", "name": "type", "type": "COMBO",
             "widget": {"name": "type"}, "link": None},
            {"localized_name": "device", "name": "device", "shape": 7, "type": "COMBO",
             "widget": {"name": "device"}, "link": None},
        ],
        "outputs": [
            {"localized_name": "CLIP", "name": "CLIP", "type": "CLIP",
             "slot_index": 0, "links": out_links},
        ],
        "properties": {"cnr_id": "comfy-core", "ver": "0.15.1", "Node name for S&R": "CLIPLoader"},
        "widgets_values": ["mistral_3_small_flux2_fp8.safetensors", "flux2", "default"],
    }


def node_vae_loader(node_id: int, order: int, pos: list, out_links: list) -> dict:
    return {
        "id": node_id, "type": "VAELoader",
        "pos": pos, "size": [324, 82],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "vae_name", "name": "vae_name", "type": "COMBO",
             "widget": {"name": "vae_name"}, "link": None},
        ],
        "outputs": [
            {"localized_name": "VAE", "name": "VAE", "type": "VAE",
             "slot_index": 0, "links": out_links},
        ],
        "properties": {"cnr_id": "comfy-core", "ver": "0.15.1", "Node name for S&R": "VAELoader"},
        "widgets_values": ["flux2-vae.safetensors"],
    }


def node_empty_latent(node_id: int, order: int, pos: list, width: int, height: int,
                      out_links: list) -> dict:
    return {
        "id": node_id, "type": "EmptyLatentImage",
        "pos": pos, "size": [324, 143.328125],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "width", "name": "width", "type": "INT",
             "widget": {"name": "width"}, "link": None},
            {"localized_name": "height", "name": "height", "type": "INT",
             "widget": {"name": "height"}, "link": None},
            {"localized_name": "batch_size", "name": "batch_size", "type": "INT",
             "widget": {"name": "batch_size"}, "link": None},
        ],
        "outputs": [
            {"localized_name": "LATENT", "name": "LATENT", "type": "LATENT",
             "slot_index": 0, "links": out_links},
        ],
        "properties": {"cnr_id": "comfy-core", "ver": "0.15.1", "Node name for S&R": "EmptyLatentImage"},
        "widgets_values": [width, height, 1],
    }


def node_clip_text_encode(node_id: int, order: int, pos: list, clip_link: int,
                          text: str, title: str, out_links: list) -> dict:
    return {
        "id": node_id, "type": "CLIPTextEncode",
        "pos": pos, "size": [504, 168],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "clip", "name": "clip", "type": "CLIP", "link": clip_link},
            {"localized_name": "text", "name": "text", "type": "STRING",
             "widget": {"name": "text"}, "link": None},
        ],
        "outputs": [
            {"localized_name": "CONDITIONING", "name": "CONDITIONING", "type": "CONDITIONING",
             "slot_index": 0, "links": out_links},
        ],
        "title": title,
        "properties": {"cnr_id": "comfy-core", "ver": "0.15.1", "Node name for S&R": "CLIPTextEncode"},
        "widgets_values": [text],
    }


def node_clip_text_encode_neg(node_id: int, order: int, pos: list, clip_link: int,
                              out_links: list) -> dict:
    return {
        "id": node_id, "type": "CLIPTextEncode",
        "pos": pos, "size": [504, 124.65625],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "clip", "name": "clip", "type": "CLIP", "link": clip_link},
            {"localized_name": "text", "name": "text", "type": "STRING",
             "widget": {"name": "text"}, "link": None},
        ],
        "outputs": [
            {"localized_name": "CONDITIONING", "name": "CONDITIONING", "type": "CONDITIONING",
             "slot_index": 0, "links": out_links},
        ],
        "title": "Negative Prompt (empty)",
        "properties": {"cnr_id": "comfy-core", "ver": "0.15.1", "Node name for S&R": "CLIPTextEncode"},
        "widgets_values": [""],
    }


def node_flux_guidance(node_id: int, order: int, pos: list, cond_link: int,
                       out_links: list) -> dict:
    return {
        "id": node_id, "type": "FluxGuidance",
        "pos": pos, "size": [336, 79.328125],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "conditioning", "name": "conditioning",
             "type": "CONDITIONING", "link": cond_link},
            {"localized_name": "guidance", "name": "guidance", "type": "FLOAT",
             "widget": {"name": "guidance"}, "link": None},
        ],
        "outputs": [
            {"localized_name": "CONDITIONING", "name": "CONDITIONING", "type": "CONDITIONING",
             "slot_index": 0, "links": out_links},
        ],
        "properties": {"cnr_id": "comfy-core", "ver": "0.15.1", "Node name for S&R": "FluxGuidance"},
        "widgets_values": [3.0],
    }


def node_ksampler(node_id: int, order: int, pos: list, model_link: int, pos_link: int,
                  neg_link: int, latent_link: int, steps: int, out_links: list) -> dict:
    return {
        "id": node_id, "type": "KSampler",
        "pos": pos, "size": [348, 336],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "model", "name": "model", "type": "MODEL", "link": model_link},
            {"localized_name": "positive", "name": "positive", "type": "CONDITIONING", "link": pos_link},
            {"localized_name": "negative", "name": "negative", "type": "CONDITIONING", "link": neg_link},
            {"localized_name": "latent_image", "name": "latent_image", "type": "LATENT", "link": latent_link},
            {"localized_name": "seed", "name": "seed", "type": "INT",
             "widget": {"name": "seed"}, "link": None},
            {"localized_name": "steps", "name": "steps", "type": "INT",
             "widget": {"name": "steps"}, "link": None},
            {"localized_name": "cfg", "name": "cfg", "type": "FLOAT",
             "widget": {"name": "cfg"}, "link": None},
            {"localized_name": "sampler_name", "name": "sampler_name", "type": "COMBO",
             "widget": {"name": "sampler_name"}, "link": None},
            {"localized_name": "scheduler", "name": "scheduler", "type": "COMBO",
             "widget": {"name": "scheduler"}, "link": None},
            {"localized_name": "denoise", "name": "denoise", "type": "FLOAT",
             "widget": {"name": "denoise"}, "link": None},
        ],
        "outputs": [
            {"localized_name": "LATENT", "name": "LATENT", "type": "LATENT",
             "slot_index": 0, "links": out_links},
        ],
        "properties": {"cnr_id": "comfy-core", "ver": "0.15.1", "Node name for S&R": "KSampler"},
        "widgets_values": [42, "randomize", steps, 1.0, "euler", "beta", 1.0],
    }


def node_vae_decode(node_id: int, order: int, pos: list, latent_link: int,
                    vae_link: int, out_links: list) -> dict:
    return {
        "id": node_id, "type": "VAEDecode",
        "pos": pos, "size": [252, 72],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "samples", "name": "samples", "type": "LATENT", "link": latent_link},
            {"localized_name": "vae", "name": "vae", "type": "VAE", "link": vae_link},
        ],
        "outputs": [
            {"localized_name": "IMAGE", "name": "IMAGE", "type": "IMAGE",
             "slot_index": 0, "links": out_links},
        ],
        "properties": {"cnr_id": "comfy-core", "ver": "0.15.1", "Node name for S&R": "VAEDecode"},
        "widgets_values": [],
    }


def node_image_scale_by(node_id: int, order: int, pos: list, image_link: int,
                        scale: float, out_links: list) -> dict:
    return {
        "id": node_id, "type": "ImageScaleBy",
        "pos": pos, "size": [276, 114],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "image", "name": "image", "type": "IMAGE", "link": image_link},
            {"localized_name": "upscale_method", "name": "upscale_method", "type": "COMBO",
             "widget": {"name": "upscale_method"}, "link": None},
            {"localized_name": "scale_by", "name": "scale_by", "type": "FLOAT",
             "widget": {"name": "scale_by"}, "link": None},
        ],
        "outputs": [
            {"localized_name": "IMAGE", "name": "IMAGE", "type": "IMAGE",
             "slot_index": 0, "links": out_links},
        ],
        "properties": {"cnr_id": "comfy-core", "ver": "0.15.1", "Node name for S&R": "ImageScaleBy"},
        "widgets_values": ["lanczos", scale],
    }


def node_nmkd_upscale(node_id: int, order: int, pos: list, image_link: int,
                      out_links: list) -> dict:
    """4x NMKD AI upscale node (UpscaleModelLoader + ImageUpscaleWithModel pattern).

    Uses NMKDSuperscaler or equivalent upscale_image_using_model from comfy-core.
    Widget: upscale_model filename + scale factor.
    Node type: UltimateSDUpscale or ImageUpscaleWithModel depending on install.
    Using ImageUpscaleWithModel which is comfy-core and known reliable.
    """
    return {
        "id": node_id, "type": "ImageUpscaleWithModel",
        "pos": pos, "size": [276, 114],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "upscale_model", "name": "upscale_model",
             "type": "UPSCALE_MODEL", "link": image_link},
            {"localized_name": "image", "name": "image", "type": "IMAGE",
             "link": None},
        ],
        "outputs": [
            {"localized_name": "IMAGE", "name": "IMAGE", "type": "IMAGE",
             "slot_index": 0, "links": out_links},
        ],
        "properties": {"cnr_id": "comfy-core", "ver": "0.15.1", "Node name for S&R": "ImageUpscaleWithModel"},
        "widgets_values": [],
    }


def node_load_upscale_model(node_id: int, order: int, pos: list, out_links: list) -> dict:
    return {
        "id": node_id, "type": "UpscaleModelLoader",
        "pos": pos, "size": [276, 82],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "model_name", "name": "model_name", "type": "COMBO",
             "widget": {"name": "model_name"}, "link": None},
        ],
        "outputs": [
            {"localized_name": "UPSCALE_MODEL", "name": "UPSCALE_MODEL",
             "type": "UPSCALE_MODEL", "slot_index": 0, "links": out_links},
        ],
        "properties": {"cnr_id": "comfy-core", "ver": "0.15.1", "Node name for S&R": "UpscaleModelLoader"},
        "widgets_values": ["4x_NMKD-Superscale-SP_178000_G.pth"],
    }


def node_image_scale_to_cap(node_id: int, order: int, pos: list, image_link: int,
                             max_w: int, max_h: int, out_links: list) -> dict:
    """Scale image down to fit within cap dimensions using ImageScale."""
    return {
        "id": node_id, "type": "ImageScale",
        "pos": pos, "size": [276, 146],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "image", "name": "image", "type": "IMAGE", "link": image_link},
            {"localized_name": "upscale_method", "name": "upscale_method", "type": "COMBO",
             "widget": {"name": "upscale_method"}, "link": None},
            {"localized_name": "width", "name": "width", "type": "INT",
             "widget": {"name": "width"}, "link": None},
            {"localized_name": "height", "name": "height", "type": "INT",
             "widget": {"name": "height"}, "link": None},
            {"localized_name": "crop", "name": "crop", "type": "COMBO",
             "widget": {"name": "crop"}, "link": None},
        ],
        "outputs": [
            {"localized_name": "IMAGE", "name": "IMAGE", "type": "IMAGE",
             "slot_index": 0, "links": out_links},
        ],
        "properties": {"cnr_id": "comfy-core", "ver": "0.15.1", "Node name for S&R": "ImageScale"},
        "widgets_values": ["lanczos", max_w, max_h, "disabled"],
    }


def node_logo_overlay(node_id: int, order: int, pos: list, image_link: int,
                      out_links: list) -> dict:
    return {
        "id": node_id, "type": "AIEngLogoOverlay",
        "pos": pos, "size": [372, 214],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "image", "name": "image", "type": "IMAGE", "link": image_link},
            {"localized_name": "logo_filename", "name": "logo_filename", "type": "STRING",
             "widget": {"name": "logo_filename"}, "link": None},
            {"localized_name": "logo_width_percent", "name": "logo_width_percent", "type": "FLOAT",
             "widget": {"name": "logo_width_percent"}, "link": None},
            {"localized_name": "position", "name": "position", "type": "COMBO",
             "widget": {"name": "position"}, "link": None},
            {"localized_name": "padding_percent", "name": "padding_percent", "type": "FLOAT",
             "widget": {"name": "padding_percent"}, "link": None},
            {"localized_name": "opacity", "name": "opacity", "type": "FLOAT",
             "widget": {"name": "opacity"}, "link": None},
        ],
        "outputs": [
            {"localized_name": "IMAGE", "name": "IMAGE", "type": "IMAGE",
             "slot_index": 0, "links": out_links},
        ],
        "title": "Logo (bottom-left)",
        "properties": {"Node name for S&R": "AIEngLogoOverlay"},
        "widgets_values": ["logo-new.png", 12, "bottom-left", 3, 0.85],
    }


def node_text_overlay(node_id: int, order: int, pos: list, image_link: int,
                      out_links: list) -> dict:
    return {
        "id": node_id, "type": "AIEngTextOverlay",
        "pos": pos, "size": [384, 500.65625],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "image", "name": "image", "type": "IMAGE", "link": image_link},
            {"localized_name": "text", "name": "text", "type": "STRING",
             "widget": {"name": "text"}, "link": None},
            {"localized_name": "font_name", "name": "font_name", "type": "STRING",
             "widget": {"name": "font_name"}, "link": None},
            {"localized_name": "font_size", "name": "font_size", "type": "INT",
             "widget": {"name": "font_size"}, "link": None},
            {"localized_name": "style", "name": "style", "type": "COMBO",
             "widget": {"name": "style"}, "link": None},
            {"localized_name": "align_h", "name": "align_h", "type": "COMBO",
             "widget": {"name": "align_h"}, "link": None},
            {"localized_name": "align_v", "name": "align_v", "type": "COMBO",
             "widget": {"name": "align_v"}, "link": None},
            {"localized_name": "margin_x", "name": "margin_x", "type": "INT",
             "widget": {"name": "margin_x"}, "link": None},
            {"localized_name": "margin_y", "name": "margin_y", "type": "INT",
             "widget": {"name": "margin_y"}, "link": None},
            {"localized_name": "intensity", "name": "intensity", "type": "FLOAT",
             "widget": {"name": "intensity"}, "link": None},
            {"localized_name": "color_top_hex", "name": "color_top_hex", "shape": 7,
             "type": "STRING", "widget": {"name": "color_top_hex"}, "link": None},
            {"localized_name": "color_bottom_hex", "name": "color_bottom_hex", "shape": 7,
             "type": "STRING", "widget": {"name": "color_bottom_hex"}, "link": None},
            {"localized_name": "glow_color_hex", "name": "glow_color_hex", "shape": 7,
             "type": "STRING", "widget": {"name": "glow_color_hex"}, "link": None},
        ],
        "outputs": [
            {"localized_name": "IMAGE", "name": "IMAGE", "type": "IMAGE",
             "slot_index": 0, "links": out_links},
        ],
        "title": "Text Overlay (headline top-center)",
        "properties": {"Node name for S&R": "AIEngTextOverlay"},
        "widgets_values": [
            "Deine Headline hier",
            "SpaceGrotesk-Bold", 72, "brand_blue", "center", "top",
            40, 40, 1.0, "#FFFFFF", "#4262FF", "#4262FF",
        ],
    }


def node_save_image(node_id: int, order: int, pos: list, image_link: int,
                    prefix: str) -> dict:
    return {
        "id": node_id, "type": "SaveImage",
        "pos": pos, "size": [276, 83.328125],
        "flags": {}, "order": order, "mode": 0,
        "inputs": [
            {"localized_name": "images", "name": "images", "type": "IMAGE", "link": image_link},
            {"localized_name": "filename_prefix", "name": "filename_prefix", "type": "STRING",
             "widget": {"name": "filename_prefix"}, "link": None},
        ],
        "outputs": [],
        "properties": {"cnr_id": "comfy-core", "ver": "0.15.1", "Node name for S&R": "SaveImage"},
        "widgets_values": [prefix],
    }


# ─────────────────────────── Workflow builders ────────────────────────────────

def build_workflow(
    width: int,
    height: int,
    steps: int,
    save_prefix: str,
    include_text: bool,
    upscale_mode: str,   # "none" | "lanczos_1_5" | "nmkd_4k"
    pos_prompt: str,
) -> dict:
    """
    Build a complete ComfyUI UI-format workflow JSON.

    Node IDs and link IDs are assigned deterministically based on the chain.

    Chain variants:
      no upscale, logo+text:
        1:UNET, 2:CLIP, 3:VAE, 4:Latent, 5:PosProm, 15:NegProm,
        6:FluxGuide, 7:KSampler, 8:VAEDecode,
        10:Logo, 11:Text, 12:Save

      no upscale, logo only:
        ... 8:VAEDecode, 10:Logo, 12:Save

      lanczos 1.5x, logo+text:
        ... 8:VAEDecode, 9:ScaleBy, 10:Logo, 11:Text, 12:Save

      lanczos 1.5x, logo only:
        ... 8:VAEDecode, 9:ScaleBy, 10:Logo, 12:Save

      nmkd 4k, logo+text:
        ... 8:VAEDecode, 20:UpscaleModelLoader, 21:ImageUpscaleWithModel,
            22:ImageScale(cap), 10:Logo, 11:Text, 12:Save

      nmkd 4k, logo only:
        ... 8:VAEDecode, 20:UpscaleModelLoader, 21:ImageUpscaleWithModel,
            22:ImageScale(cap), 10:Logo, 12:Save

    Link IDs (fixed for base chain):
      1: CLIP(2) → PosProm(5) slot 0   [CLIP]
      2: PosProm(5) → FluxGuide(6)     [CONDITIONING]
      3: FluxGuide(6) → KSampler(7)    [CONDITIONING] (positive, slot 1)
      5: UNET(1) → KSampler(7)         [MODEL]
      6: Latent(4) → KSampler(7)       [LATENT]
      7: KSampler(7) → VAEDecode(8)    [LATENT]
      8: VAE(3) → VAEDecode(8)         [VAE]
      13: CLIP(2) → NegProm(15)        [CLIP]
      14: NegProm(15) → KSampler(7)    [CONDITIONING] (negative, slot 2)

    Image chain links depend on upscale_mode and include_text.
    """
    # Base nodes (always present): 1,2,3,4,5,15,6,7,8
    # Node 2 CLIP output must list ALL outgoing clip links
    clip_out_links = [1, 13]  # to PosProm and NegProm

    nodes = [
        node_unet_loader(1, 0, [26, 74], [5]),
        node_clip_loader(2, 1, [26, 218], clip_out_links),
        node_vae_loader(3, 2, [26, 362], [8]),
        node_empty_latent(4, 3, [26, 482], width, height, [6]),
        node_clip_text_encode(5, 4, [398, 218], 1, pos_prompt, "Positive Prompt", [2]),
        node_clip_text_encode_neg(15, 5, [398, 434], 13, [14]),
        node_flux_guidance(6, 6, [398, 602], 2, [3]),
        node_ksampler(7, 7, [950, 74], 5, 3, 14, 6, steps, [7]),
        node_vae_decode(8, 8, [1346, 74], 7, 8, [9]),
    ]

    # Determine image chain after VAEDecode
    # VAEDecode(8) outputs link 9 to first image node
    # We'll track: current x position, current image link id, next_order, next_link_id
    x = 1646
    current_img_link = 9
    next_order = 9
    next_link_id = 15  # Links 1-14 are base. 13,14 are used. 15 is next available.

    image_chain_links = []  # [link_id, src, src_slot, dst, dst_slot, type]

    if upscale_mode == "lanczos_1_5":
        # Node 9: ImageScaleBy (1.5x lanczos)
        logo_in_link = next_link_id
        nodes.append(node_image_scale_by(9, next_order, [x, 74], current_img_link, 1.5, [logo_in_link]))
        image_chain_links.append([current_img_link, 8, 0, 9, 0, "IMAGE"])
        current_img_link = logo_in_link
        next_link_id += 1
        next_order += 1
        x += 330

    elif upscale_mode == "nmkd_4k":
        # Node 20: UpscaleModelLoader
        # Node 21: ImageUpscaleWithModel
        # Node 22: ImageScale (cap at 3840x2160)
        model_out_link = next_link_id
        next_link_id += 1
        upscale_out_link = next_link_id
        next_link_id += 1
        cap_out_link = next_link_id
        next_link_id += 1

        nodes.append(node_load_upscale_model(20, next_order, [x, 74], [model_out_link]))
        next_order += 1
        x += 330

        # ImageUpscaleWithModel: input[0]=upscale_model link, input[1]=image link
        upscale_node = {
            "id": 21, "type": "ImageUpscaleWithModel",
            "pos": [x, 74], "size": [276, 114],
            "flags": {}, "order": next_order, "mode": 0,
            "inputs": [
                {"localized_name": "upscale_model", "name": "upscale_model",
                 "type": "UPSCALE_MODEL", "link": model_out_link},
                {"localized_name": "image", "name": "image", "type": "IMAGE",
                 "link": current_img_link},
            ],
            "outputs": [
                {"localized_name": "IMAGE", "name": "IMAGE", "type": "IMAGE",
                 "slot_index": 0, "links": [upscale_out_link]},
            ],
            "properties": {"cnr_id": "comfy-core", "ver": "0.15.1",
                           "Node name for S&R": "ImageUpscaleWithModel"},
            "widgets_values": [],
        }
        nodes.append(upscale_node)
        # Register links for model and image inputs
        image_chain_links.append([model_out_link, 20, 0, 21, 0, "UPSCALE_MODEL"])
        image_chain_links.append([current_img_link, 8, 0, 21, 1, "IMAGE"])
        next_order += 1
        x += 330

        # ImageScale cap to 3840x2160
        nodes.append(node_image_scale_to_cap(22, next_order, [x, 74],
                                              upscale_out_link, 3840, 2160, [cap_out_link]))
        image_chain_links.append([upscale_out_link, 21, 0, 22, 0, "IMAGE"])
        current_img_link = cap_out_link
        next_order += 1
        x += 330

    # Logo overlay (always present)
    logo_out_link = next_link_id
    next_link_id += 1
    nodes.append(node_logo_overlay(10, next_order, [x, 74], current_img_link, [logo_out_link]))
    if upscale_mode == "none":
        # VAEDecode(8) → Logo(10): link 9
        image_chain_links.append([current_img_link, 8, 0, 10, 0, "IMAGE"])
    elif upscale_mode == "lanczos_1_5":
        # ScaleBy(9) → Logo(10)
        image_chain_links.append([current_img_link, 9, 0, 10, 0, "IMAGE"])
    else:
        # ImageScale(22) → Logo(10)
        image_chain_links.append([current_img_link, 22, 0, 10, 0, "IMAGE"])
    current_img_link = logo_out_link
    next_order += 1
    x += 420

    if include_text:
        text_out_link = next_link_id
        next_link_id += 1
        nodes.append(node_text_overlay(11, next_order, [x, 74], current_img_link, [text_out_link]))
        image_chain_links.append([current_img_link, 10, 0, 11, 0, "IMAGE"])
        current_img_link = text_out_link
        next_order += 1
        x += 420

    # SaveImage
    save_in_link = current_img_link
    if include_text:
        save_src_node = 11
    elif upscale_mode == "none":
        save_src_node = 10
    elif upscale_mode == "lanczos_1_5":
        save_src_node = 10
    else:
        save_src_node = 10

    nodes.append(node_save_image(12, next_order, [x, 74], save_in_link, save_prefix))
    image_chain_links.append([save_in_link, save_src_node, 0, 12, 0, "IMAGE"])

    # Base links (fixed)
    base_links = [
        [1, 2, 0, 5, 0, "CLIP"],        # CLIP → PosProm
        [2, 5, 0, 6, 0, "CONDITIONING"], # PosProm → FluxGuide
        [3, 6, 0, 7, 1, "CONDITIONING"], # FluxGuide → KSampler (positive)
        [5, 1, 0, 7, 0, "MODEL"],         # UNET → KSampler
        [6, 4, 0, 7, 3, "LATENT"],        # Latent → KSampler
        [7, 7, 0, 8, 0, "LATENT"],        # KSampler → VAEDecode
        [8, 3, 0, 8, 1, "VAE"],           # VAE → VAEDecode
        [9, 8, 0, None, 0, "IMAGE"],      # VAEDecode → first image node (placeholder)
        [13, 2, 0, 15, 0, "CLIP"],        # CLIP → NegProm
        [14, 15, 0, 7, 2, "CONDITIONING"],# NegProm → KSampler (negative)
    ]

    # Link 9 from VAEDecode to first image consumer
    # Determine first image consumer
    if upscale_mode == "lanczos_1_5":
        first_img_dst = 9
    elif upscale_mode == "nmkd_4k":
        first_img_dst = 21
    else:
        first_img_dst = 10

    # Fix link 9 destination
    for lnk in base_links:
        if lnk[0] == 9:
            lnk[3] = first_img_dst
            lnk[4] = 1 if upscale_mode == "nmkd_4k" else 0
            break

    # Combine: base links + image chain links (but skip link 9 from image_chain_links if already in base)
    # image_chain_links may already contain link 9 (VAEDecode→first node), skip duplicates
    image_chain_link_ids = {lnk[0] for lnk in image_chain_links}
    # Remove link 9 from image_chain_links since it's already in base_links
    image_chain_links_filtered = [lnk for lnk in image_chain_links if lnk[0] != 9]

    all_links = base_links + image_chain_links_filtered

    # Determine last_node_id and last_link_id
    last_node_id = max(n["id"] for n in nodes)
    last_link_id = max(lnk[0] for lnk in all_links)

    return {
        "id": str(uuid.uuid4()),
        "revision": 0,
        "last_node_id": last_node_id,
        "last_link_id": last_link_id,
        "nodes": nodes,
        "links": all_links,
        "groups": [],
        "config": {},
        "extra": {
            "ds": {"scale": 0.4, "offset": [-300, 200]},
            "workflowRendererVersion": "Vue",
        },
        "version": 0.4,
    }


# ─────────────────────────── Workflow definitions ─────────────────────────────

POSITIVE_PROMPT = (
    "[TOPIC VISUAL HERE], isometric composition, neon cyan accent lights, "
    "dark navy background, professional photography style, ultra-detailed, "
    "8k, sharp focus, no text, no words, no letters, no watermarks, no logo"
)

WORKFLOWS = {
    "wiki-thumbnail.json": build_workflow(
        width=512, height=384, steps=20,
        save_prefix="wiki_thumb",
        include_text=True,
        upscale_mode="none",
        pos_prompt=POSITIVE_PROMPT,
    ),
    "wiki-hero.json": build_workflow(
        width=1344, height=768, steps=34,
        save_prefix="wiki_hero",
        include_text=False,
        upscale_mode="none",
        pos_prompt=POSITIVE_PROMPT,
    ),
    "social-hq-v4.json": build_workflow(
        width=1344, height=1344, steps=34,
        save_prefix="social_hq_v4",
        include_text=True,
        upscale_mode="none",
        pos_prompt=POSITIVE_PROMPT,
    ),
    "blog-hero-4k.json": build_workflow(
        width=1344, height=768, steps=34,
        save_prefix="blog_hero_4k",
        include_text=False,
        upscale_mode="nmkd_4k",
        pos_prompt=POSITIVE_PROMPT,
    ),
    "ultra-4k.json": build_workflow(
        width=1344, height=1344, steps=34,
        save_prefix="ultra_4k",
        include_text=True,
        upscale_mode="nmkd_4k",
        pos_prompt=POSITIVE_PROMPT,
    ),
}


# ─────────────────────────── Verification ─────────────────────────────────────

def verify_workflow(wf: dict, name: str) -> bool:
    """Verify workflow has required ComfyUI fields and structural integrity."""
    node_ids = {n["id"] for n in wf["nodes"]}
    link_ids = {lnk[0] for lnk in wf["links"]}

    # Check all link references resolve to existing node IDs
    broken_links = []
    for lnk in wf["links"]:
        lnk_id, src, src_slot, dst, dst_slot, lnk_type = lnk
        if src not in node_ids:
            broken_links.append(f"  Link {lnk_id}: src node {src} not in nodes")
        if dst not in node_ids:
            broken_links.append(f"  Link {lnk_id}: dst node {dst} not in nodes")

    # Check node input links reference existing link IDs
    broken_inputs = []
    for node in wf["nodes"]:
        for inp in node.get("inputs", []):
            lnk = inp.get("link")
            if lnk is not None and lnk not in link_ids:
                broken_inputs.append(f"  Node {node['id']} ({node['type']}) input '{inp['name']}': link {lnk} missing")

    # Check node output links reference existing link IDs
    broken_outputs = []
    for node in wf["nodes"]:
        for out in node.get("outputs", []):
            for lnk in out.get("links", []):
                if lnk not in link_ids:
                    broken_outputs.append(f"  Node {node['id']} ({node['type']}) output '{out['name']}': link {lnk} missing")

    checks = {
        "Has id": "id" in wf,
        "Has revision=0": wf.get("revision") == 0,
        "Version 0.4": wf.get("version") == 0.4,
        "workflowRendererVersion=Vue": wf.get("extra", {}).get("workflowRendererVersion") == "Vue",
        "No frontendVersion": "frontendVersion" not in wf.get("extra", {}),
        "Has nodes": len(wf.get("nodes", [])) > 0,
        "Has links": len(wf.get("links", [])) > 0,
        "UNETLoader present": any(n["type"] == "UNETLoader" for n in wf["nodes"]),
        "CLIPLoader present": any(n["type"] == "CLIPLoader" for n in wf["nodes"]),
        "KSampler present": any(n["type"] == "KSampler" for n in wf["nodes"]),
        "SaveImage present": any(n["type"] == "SaveImage" for n in wf["nodes"]),
        "All nodes have flags={}": all("flags" in n and n["flags"] == {} for n in wf["nodes"]),
        "No broken link refs": len(broken_links) == 0,
        "No broken input links": len(broken_inputs) == 0,
        "No broken output links": len(broken_outputs) == 0,
    }

    all_ok = all(checks.values())
    status = "OK" if all_ok else "FAIL"
    print(f"[{status}] {name}: {len(wf['nodes'])} nodes, {len(wf['links'])} links")
    for k, v in checks.items():
        if not v:
            print(f"  FAIL: {k}")
    for msg in broken_links + broken_inputs + broken_outputs:
        print(msg)
    return all_ok


# ─────────────────────────── Main ─────────────────────────────────────────────

if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("=== Creating Wiki ComfyUI Workflows ===")
    print(f"Output: {OUTPUT_DIR}")
    print()

    all_ok = True
    for filename, wf in WORKFLOWS.items():
        path = os.path.join(OUTPUT_DIR, filename)
        with open(path, "w", encoding="utf-8") as f:
            json.dump(wf, f, indent=2)
        ok = verify_workflow(wf, filename)
        all_ok = all_ok and ok
        print(f"  Written: {path}")
        print()

    if all_ok:
        print("All 5 workflows created successfully!")
        print()
        print("Next steps:")
        print("  1. Deploy to .90 via scp + docker cp")
        print("  2. Open in ComfyUI UI and verify graph renders correctly")
    else:
        print("WARNING: Some workflows have structural issues!")
        raise SystemExit(1)
