import bpy
import math
import os
from mathutils import Vector

OUT = os.environ.get('GLB_OUT', os.path.join(os.getcwd(), 'assets', 'models'))
os.makedirs(OUT, exist_ok=True)
ROLES = {
    'zhaoyun': {'body': (0.12, 0.24, 0.38, 1), 'accent': (0.82, 0.52, 0.12, 1), 'clips': ['idle','walk','attack','hit','protect','victory','defeat']},
    'adou': {'body': (0.12, 0.30, 0.65, 1), 'accent': (0.82, 0.52, 0.12, 1), 'clips': ['idle','follow','scared','rescued','defeat']},
    'enemy': {'body': (0.36, 0.08, 0.14, 1), 'accent': (0.22, 0.22, 0.22, 1), 'clips': ['idle','walk','attack','hit','defeat']},
}

def mat(name, color):
    m = bpy.data.materials.new(name); m.diffuse_color = color; return m

def cube(name, parent, loc, scale, material):
    bpy.ops.mesh.primitive_cube_add(location=loc); o=bpy.context.object; o.name=name; o.scale=scale; o.data.materials.append(material); o.parent=parent; return o

def sphere(name, parent, loc, scale, material):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, location=loc); o=bpy.context.object; o.name=name; o.scale=scale; o.data.materials.append(material); o.parent=parent; return o

def make_role(role, spec):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    root=bpy.data.objects.new(role, None); bpy.context.collection.objects.link(root)
    body=mat(role+'Body', spec['body']); accent=mat(role+'Accent', spec['accent'])
    cube('Body',root,(0,0,1.0),(.42,.28,.65),body); sphere('Head',root,(0,0,2.0),(.32,.32,.32),body)
    if role=='zhaoyun':
        cube('Sash',root,(0,0,1.15),(.5,.32,.08),accent); cube('Spear',root,(.62,0,1.2),(.06,.06,1.2),accent)
    elif role=='adou': cube('Ornament',root,(0,0,2.35),(.12,.12,.16),accent)
    else: cube('Shoulder',root,(0,0,1.52),(.52,.34,.12),accent)
    root.rotation_mode='XYZ'; root.keyframe_insert(data_path='rotation_euler', frame=1)
    root.rotation_euler[2]=math.radians(3); root.keyframe_insert(data_path='rotation_euler', frame=12)
    root.rotation_euler[2]=math.radians(-3); root.keyframe_insert(data_path='rotation_euler', frame=24)
    action=root.animation_data.action; action.name='idle'
    for clip in spec['clips'][1:]:
        act=bpy.data.actions.new(clip); track=root.animation_data.nla_tracks.new(); track.name=clip; strip=track.strips.new(clip,1,act); strip.action_frame_start=1; strip.action_frame_end=24; strip.frame_start=1; strip.frame_end=24
    bpy.context.view_layer.objects.active=root; root.select_set(True)
    bpy.ops.object.select_all(action='DESELECT'); root.select_set(True); bpy.context.view_layer.objects.active=root
    bpy.ops.export_scene.gltf(filepath=os.path.join(OUT,role+'.glb'), export_format='GLB', use_selection=True, export_animations=True)

for role, spec in ROLES.items(): make_role(role,spec)
print('GENERATED GLB:', ', '.join(sorted(ROLES)))
