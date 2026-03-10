"""
Generate hero images for Liberin Technologies pitch deck using Replicate FLUX 2 Pro.
Reads API token from ~/Desktop/asset-generator/.env
"""

import os
import replicate
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path.home() / "Desktop" / "asset-generator" / ".env")

OUTPUT_DIR = Path(__file__).parent / "assets" / "images"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

IMAGES = [
    {
        "filename": "hero-ai.webp",
        "prompt": (
            "Abstract futuristic AI neural network visualization, deep blue #145492 color palette, "
            "clean minimal geometric shapes, enterprise technology, white highlights and subtle gold accents, "
            "professional corporate feel, interconnected nodes and data streams, dark background, "
            "cinematic lighting, 4K ultra detailed"
        ),
    },
    {
        "filename": "problem-visual.webp",
        "prompt": (
            "Broken data silos visualization, disconnected enterprise database systems, "
            "fragmented communication channels shown as scattered geometric blocks, "
            "dark moody lighting with red warning accents, corporate office technology setting, "
            "photorealistic, dramatic shadows, 4K"
        ),
    },
    {
        "filename": "vision-global.webp",
        "prompt": (
            "Futuristic Indian cityscape at dawn, smart city infrastructure with digital overlays, "
            "golden sunrise over modern skyscrapers, AI holographic data visualizations in the sky, "
            "optimistic and grand atmosphere, cinematic wide shot, Mumbai or Delhi skyline inspired, "
            "clean professional feel, 4K ultra detailed"
        ),
    },
]


def generate_image(image_config: dict) -> str:
    """Generate a single image using FLUX 2 Pro and save to disk."""
    print(f"Generating {image_config['filename']}...")

    output = replicate.run(
        "black-forest-labs/flux-2-pro",
        input={
            "prompt": image_config["prompt"],
            "width": 1920,
            "height": 1080,
            "num_inference_steps": 28,
            "guidance_scale": 3.5,
        },
    )

    output_path = OUTPUT_DIR / image_config["filename"]

    if hasattr(output, "read"):
        with open(output_path, "wb") as f:
            f.write(output.read())
    else:
        import urllib.request
        url = str(output[0]) if isinstance(output, list) else str(output)
        urllib.request.urlretrieve(url, output_path)

    print(f"Saved: {output_path}")
    return str(output_path)


def main():
    token = os.environ.get("REPLICATE_API_TOKEN")
    if not token:
        raise EnvironmentError(
            "REPLICATE_API_TOKEN not found. Check ~/Desktop/asset-generator/.env"
        )

    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Generating {len(IMAGES)} images...\n")

    for img in IMAGES:
        try:
            generate_image(img)
        except Exception as e:
            print(f"Error generating {img['filename']}: {e}")

    print("\nDone! All images saved to assets/images/")


if __name__ == "__main__":
    main()
