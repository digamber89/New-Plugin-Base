<?php


namespace Digthis\Helpers;


class templates {
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
		$template_dir = empty( $template_dir ) ? $this->template_dir : $template_dir;

		return $template_dir;
	}

	public function include_file( $file = '', $args = array() ) {
		if ( locate_template( $this->theme_folder . '/' . $file ) ) {
			locate_template( $this->theme_folder . '/' . $file, true );
		} else {
			$file_path = $this->get_template_dir() . $file;
			if ( file_exists( $file_path ) ) {
				include $file_path;
			}
		}
	}
}

function plugin_routing() {
	return templates::get_instance();
}