from pathlib import Path
import math
import subprocess
import wave

from PIL import Image, ImageDraw, ImageFont
from imageio_ffmpeg import get_ffmpeg_exe

ROOT = Path(__file__).parent
W, H, FPS = 1080, 1350, 30
OUT = ROOT / "pattedaari-linkedin-launch.mp4"
THUMB = ROOT / "pattedaari-linkedin-thumbnail.jpg"

def font(path, size):
    return ImageFont.truetype(path, size)

EN_FONT = r"C:\Windows\Fonts\segoeuib.ttf"
EN_REG = r"C:\Windows\Fonts\segoeui.ttf"
KN_FONT = r"C:\Windows\Fonts\Nirmala.ttc"

def fit_image(path):
    image = Image.open(ROOT / path).convert("RGB")
    scale = max(W / image.width, H / image.height)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - W) // 2
    top = (resized.height - H) // 2
    return resized.crop((left, top, left + W, top + H))

stills = [
    fit_image("launch_01_intro.png"),
    fit_image("launch_02_clue.png"),
    fit_image("launch_03_notebook.png"),
    fit_image("launch_04_deduce.png"),
    fit_image("launch_05_solved.png"),
]
segments = [
    (4, "Can you solve a mystery in Kannada?", "Pattedaari  /  ಪತ್ತೇದಾರಿ"),
    (6, "Read the clues. Follow the evidence.", "Daily case · a new puzzle variation"),
    (7, "Build your theory.", "Mark the notebook. Test every possibility."),
    (6, "Choose the suspect. Weapon. Time.", "Archive case · October 6 solution reveal"),
    (7, "Your next case awaits.", "Play: pattedaari.netlify.app"),
]

def text(draw, xy, value, size, fill, bold=False, anchor="la"):
    path = EN_FONT if bold else EN_REG
    if any("\u0c80" <= c <= "\u0cff" for c in value):
        path = KN_FONT
    draw.text(xy, value, font=font(path, size), fill=fill, anchor=anchor)

def render_frame(index, frame_in_segment, segment_frames):
    current = stills[index]
    next_image = stills[min(index + 1, len(stills) - 1)]
    progress = frame_in_segment / max(1, segment_frames - 1)
    if progress > 0.82 and index < len(stills) - 1:
        blend = (progress - 0.82) / 0.18
        current = Image.blend(current, next_image, blend)
    zoom = 1.0 + 0.025 * progress
    zw, zh = round(W * zoom), round(H * zoom)
    current = current.resize((zw, zh), Image.Resampling.LANCZOS)
    current = current.crop(((zw - W) // 2, (zh - H) // 2, (zw + W) // 2, (zh + H) // 2))
    draw = ImageDraw.Draw(current, "RGBA")
    draw.rectangle((0, 0, W, 188), fill=(7, 20, 23, 216))
    draw.rectangle((0, H - 205, W, H), fill=(7, 20, 23, 224))
    _, title, subtitle = segments[index]
    text(draw, (64, 62), title, 42, (255, 248, 231, 255), bold=True)
    text(draw, (64, 125), subtitle, 25, (239, 189, 120, 255))
    text(draw, (64, H - 145), "PAT T E D A A R I", 21, (239, 189, 120, 255), bold=True)
    if index == 0:
        text(draw, (64, H - 92), "ಕನ್ನಡ ಪತ್ತೇದಾರಿ ಆಟ", 28, (255, 248, 231, 255))
    elif index == 4:
        text(draw, (64, H - 92), "Inspired by Mystery-o-matic · Built with AI assistance", 20, (224, 232, 224, 255))
    else:
        text(draw, (64, H - 92), "Readable without sound · Follow the evidence", 20, (224, 232, 224, 255))
    draw.line((64, H - 44, W - 64, H - 44), fill=(239, 189, 120, 150), width=2)
    return current

def make_audio(path, seconds):
    rate = 48000
    total = int(rate * seconds)
    with wave.open(str(path), "wb") as stream:
        stream.setnchannels(2)
        stream.setsampwidth(2)
        stream.setframerate(rate)
        for i in range(total):
            t = i / rate
            fade = min(1.0, t / 1.5, (seconds - t) / 2.0)
            pulse = 0.5 + 0.5 * math.sin(2 * math.pi * 0.18 * t)
            sample = (
                0.11 * math.sin(2 * math.pi * 146.83 * t)
                + 0.06 * math.sin(2 * math.pi * 220.0 * t)
                + 0.035 * math.sin(2 * math.pi * 293.66 * t)
                + 0.018 * pulse * math.sin(2 * math.pi * 73.42 * t)
            ) * fade
            value = max(-1.0, min(1.0, sample))
            packed = int(value * 32767).to_bytes(2, "little", signed=True)
            stream.writeframesraw(packed + packed)

raw_video = ROOT / "pattedaari-video-silent.mp4"
audio = ROOT / "pattedaari-original-ambient.wav"
ffmpeg = get_ffmpeg_exe()
writer = subprocess.Popen(
    [ffmpeg, "-y", "-f", "rawvideo", "-vcodec", "rawvideo", "-pix_fmt", "rgb24",
     "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-an",
     "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", str(raw_video)],
    stdin=subprocess.PIPE,
)
for index, (seconds, _, _) in enumerate(segments):
    frames = seconds * FPS
    for frame_in_segment in range(frames):
        writer.stdin.write(render_frame(index, frame_in_segment, frames).tobytes())
writer.stdin.close()
if writer.wait() != 0:
    raise SystemExit("Video encoding failed")
make_audio(audio, sum(seconds for seconds, _, _ in segments))
subprocess.run(
    [ffmpeg, "-y", "-i", str(raw_video), "-i", str(audio), "-c:v", "copy",
     "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", str(OUT)],
    check=True,
)
render_frame(4, 180, 210).save(THUMB, quality=94, optimize=True)
raw_video.unlink()
audio.unlink()
print(f"Created {OUT.name} and {THUMB.name}")
