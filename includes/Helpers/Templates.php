<?php


namespace Digthis\PluginBase\Helpers;

class Templates {
	public $theme_folder = 'plugin-base';
	public $template_dir = PLUGIN_DIR . '/templates/';
	public static $instance = null;

	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	public function get_template_dir( $template_dir = '' ) {
		return empty( $template_dir ) ? $this->template_dir : $template_dir;
	}

	public function include_file( $file = '', $args = array(), $require_once = false ) {
		if ( locate_template( $this->theme_folder . '/' . $file ) ) {
			load_template( $this->theme_folder . '/' . $file, $require_once, $args );
		} else {
			$file_path = $this->get_template_dir() . $file;
			if ( file_exists( $file_path ) ) {
				load_template( $file_path, $require_once, $args );
			}
		}
	}
}

