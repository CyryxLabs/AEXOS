#!/usr/bin/env python3
"""
Enrich events with AEXOS context (agent, story, task, etc.)
"""

import os
import re
from pathlib import Path
from typing import Any


def enrich_event(data: dict[str, Any]) -> dict[str, Any]:
    """Add AEXOS context to event data."""

    # Project detection
    cwd = data.get("cwd", os.getcwd())
    data["project"] = detect_project(cwd)

    # AEXOS context from environment
    if os.environ.get("AEXOS_AGENT"):
        data["cyryx_agent"] = os.environ["AEXOS_AGENT"]

    if os.environ.get("AEXOS_STORY_ID"):
        data["cyryx_story_id"] = os.environ["AEXOS_STORY_ID"]

    if os.environ.get("AEXOS_TASK_ID"):
        data["cyryx_task_id"] = os.environ["AEXOS_TASK_ID"]

    # Try to detect AEXOS agent from user prompt if available
    user_prompt = data.get("user_prompt", "")
    if user_prompt:
        detected_agent = detect_agent_from_prompt(user_prompt)
        if detected_agent and not data.get("cyryx_agent"):
            data["cyryx_agent"] = detected_agent

    return data


def detect_project(cwd: str) -> str:
    """Detect project name from cwd."""
    path = Path(cwd)

    # Check for common project markers
    markers = [".git", "package.json", "Cargo.toml", "go.mod", "pyproject.toml"]
    for marker in markers:
        if (path / marker).exists():
            return path.name

    return path.name


def detect_agent_from_prompt(prompt: str) -> str | None:
    """Detect AEXOS agent activation from prompt."""
    # Look for @agent patterns
    match = re.search(r'@(dev|architect|qa|pm|po|sm|analyst|devops|aexos-master)', prompt.lower())
    if match:
        return match.group(1)
    return None
