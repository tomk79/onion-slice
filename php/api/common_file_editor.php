<?php
namespace tomk79\onionSlice\api;

class common_file_editor {


	/**
	 * Common File Editor: API: read, write
	 */
	static public function gpi( $rencon ){
		header('Content-type: text/json');

		$fs = $rencon->fs();

		$projects = new \tomk79\onionSlice\model\projects($rencon);
		$project_id = $rencon->get_route_param('projectId');
		$project_info = $projects->get_project($project_id);
		$realpath_basedir = $project_info->realpath_base_dir;

		$rtn = array();

		if( $rencon->req()->get_method() != 'post' ){
			echo json_encode(false);
			exit();
		}

		if( !strlen($rencon->req()->get_param('filename') ?? '') ){
			echo json_encode(false);
			exit();
		}
		$filename = $fs->normalize_path( $fs->get_realpath('/'.$rencon->req()->get_param('filename')) );
		if( !strlen($filename ?? '') || $filename == '/' ){
			echo json_encode(false);
			exit();
		}
		if(
			$filename == '/.git' || preg_match( '/^\/\.git(?:\/.*)?$/', $filename ) ||
			$filename == '/vendor' || preg_match( '/^\/vendor(?:\/.*)?$/', $filename ) ||
			$filename == '/node_modules' || preg_match( '/^\/node_modules(?:\/.*)?$/', $filename )
		){
			echo json_encode(false);
			exit();
		}
		$realpath_filename = $fs->normalize_path( $fs->get_realpath( $realpath_basedir.$filename) );

		if( $rencon->req()->get_param('method') == 'read' ){
			$bin = $rencon->fs()->read_file( $realpath_filename );
			$rtn['base64'] = base64_encode($bin);

		}elseif( $rencon->req()->get_param('method') == 'write' ){
			$bin = '';
			if( strlen($rencon->req()->get_param('base64') ?? '') ){
				$bin = base64_decode( $rencon->req()->get_param('base64') );
			}elseif( strlen($rencon->req()->get_param('bin') ?? '') ){
				$bin = $rencon->req()->get_param('bin');
			}
			$rtn['result'] = $rencon->fs()->save_file( $realpath_filename, $bin );

		}elseif( $rencon->req()->get_param('method') == 'copy' ){
			$realpath_copyto = $realpath_basedir.$fs->get_realpath('/'.$rencon->req()->get_param('to'));
			$rtn['result'] = $fs->copy_r( $realpath_filename, $realpath_copyto );

		}elseif( $rencon->req()->get_param('method') == 'rename' ){
			$realpath_copyto = $realpath_basedir.$fs->get_realpath('/'.$rencon->req()->get_param('to'));
			$rtn['result'] = $fs->rename_f( $realpath_filename, $realpath_copyto );

		}elseif( $rencon->req()->get_param('method') == 'is_file' ){
			$rtn['result'] = is_file( $realpath_filename );

		}elseif( $rencon->req()->get_param('method') == 'is_dir' ){
			$rtn['result'] = is_dir( $realpath_filename );

		}elseif( $rencon->req()->get_param('method') == 'exists' ){
			$rtn['result'] = file_exists( $realpath_filename );

		}elseif( $rencon->req()->get_param('method') == 'remove' ){
			$fs->chmod_r( $realpath_filename, 0777 );
			$rtn['result'] = $fs->rm( $realpath_filename );
		}

		echo json_encode($rtn);
		exit();
	}

}
