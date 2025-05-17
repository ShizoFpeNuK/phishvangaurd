# -*- mode: python ; coding: utf-8 -*-

import os
from PyInstaller.utils.hooks import collect_submodules, collect_dynamic_libs, collect_data_files

hiddenimports = (
  collect_submodules('src') + 
  collect_submodules('cryptography') + 
  collect_submodules('selenium') + 
  collect_submodules('webdriver_manager') + [
    'shap',
    'skimage',
    'skimage.metrics'
])

binaries = collect_dynamic_libs('cryptography')

datas = (
    collect_data_files('whois', includes=['data/public_suffix_list.dat']) + 
    [('src', 'src')]
)

a = Analysis(
    ['main.py'],
    pathex=['.'],
    binaries=binaries,
    datas=datas,
    hiddenimports=hiddenimports + ['whois', 'pytz', 'cryptography'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    noarchive=False,
    optimize=0,
)
pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    [],
    name='main',
    debug=False,
    bootloader_ignore_signals=False,
    strip=False,
    upx=True,
    upx_exclude=[],
    runtime_tmpdir=None,
    console=True,
    disable_windowed_traceback=False,
    argv_emulation=False,
    target_arch=None,
    codesign_identity=None,
    entitlements_file=None,
)
