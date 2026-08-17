#!/usr/bin/env python3
"""Serve the recipe site on your local network.

Run this, then on any device on the same wifi open:
    http://<this-computer's-LAN-IP>:8000

The script prints the exact URL(s) to use when it starts.
"""
import http.server
import socketserver
import socket
import os

PORT = 8020
SITE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "site")


def get_lan_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"
    finally:
        s.close()


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=SITE_DIR, **kwargs)


class ThreadingServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


def main():
    lan_ip = get_lan_ip()
    with ThreadingServer(("0.0.0.0", PORT), Handler) as httpd:
        print(f"Serving recipes from: {SITE_DIR}")
        print()
        print(f"  On this PC:        http://localhost:{PORT}")
        print(f"  On other devices:  http://{lan_ip}:{PORT}")
        print()
        print("Press Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopped.")


if __name__ == "__main__":
    main()
