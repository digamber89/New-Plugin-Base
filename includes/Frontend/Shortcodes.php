<?php

namespace Digthis\PluginBase\Frontend;

use Digthis\PluginBase\Helpers\Templates;

class Shortcodes {
	public static $count;
	public static $instance = null;

	public static function get_instance() {
		return is_null( self::$instance ) ? new self() : self::$instance;
	}

	/**
	 * @return mixed
	 */
	public static function getCount() {
		return self::$count;
	}

	/**
	 * Shortcodes constructor.
	 */
	public function __construct() {
		add_shortcode( 'plugin_shortcode_placeholder', array( $this, 'render_shortcode' ) );
	}

	public function render_shortcode( $atts ) {
		$atts       = shortcode_atts( array(
			'post_type'      => 'post',
			'posts_per_page' => '5'
		), $atts );
		$query_args = array(
			'post_type'      => $atts['post_type'],
			'posts_per_page' => $atts['posts_per_page']
		);
		$posts      = new \WP_Query( $query_args );
		if ( $posts->have_posts() ) {
			Templates::get_instance()->include_file( 'shortcode.php', [ 'posts' => $posts ] );
		}
	}
}