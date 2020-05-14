#!/usr/bin/env python3
import os
import sys
import hashlib
import argparse

def hash_user(username):
    return str(int(hashlib.md5(username.encode('utf-8')).hexdigest(), 16))[:16]

parser = argparse.ArgumentParser()
parser.add_argument('-f', '--field', nargs='?', type=int, default=2, help='field index to sanitize, 0-based',)
parser.add_argument("file", nargs='+', help='file(s) to sanitize')
args = parser.parse_args()

for fn in args.file:
    with open(fn) as fn_score:
        for line in fn_score:
            fields = line.split('|')
            username = fields[args.field]
            if len(username.split(':')) > 1:
                (username, handle) = username.split(':')
                fields[args.field] = ':'.join((hash_user(username), handle))
            else:
                fields[args.field] = hash_user(fields[args.field])

            print('|'.join(fields), end='')
