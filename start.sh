#!/bin/sh

mount -t cifs -o vers=3.0,username=spin.net-backend,password=wK0QDuTj3F,uid=1005,gid=1005 \\\\192.168.1.9\\reference /horton/reference
mount -t cifs -o vers=3.0,username=spin.net-backend,password=wK0QDuTj3F,uid=1005,gid=1005 \\\\192.168.1.9\\wiring /horton/wiring
mount -t cifs -o vers=3.0,username=spin.net-backend,password=wK0QDuTj3F,uid=1005,gid=1005 \\\\192.168.1.9\\instructions /horton/instructions

npm start
