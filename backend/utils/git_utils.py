"""
Git utility functions.
"""

from urllib.parse import urlparse


def is_valid_github_url(url: str) -> bool:
    """
    Validate a GitHub repository URL.

    Returns True only for URLs like:
    https://github.com/owner/repository
    """

    parsed = urlparse(url)

    if parsed.scheme != "https":
        return False

    if parsed.netloc != "github.com":
        return False

    path = parsed.path.strip("/").split("/")

    return len(path) == 2