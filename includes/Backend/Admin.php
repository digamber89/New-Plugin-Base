<?php

namespace Digthis\PluginBase\Backend;

class Admin {
	public static $instance = null;
	public $settings = '';
	public $admin_page_url = 'plugin-url';
	public $menu_page = '';

	/**
	 * @return Admin
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	/**
	 *
	 */
	public function __construct() {
		/*load dependencies if required*/
		add_action( 'admin_menu', array( $this, 'admin_menu_page' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'load_scripts' ) );

		add_action( 'wp_ajax_getDigthisAdminSettings', [ $this, 'getSettings' ] );
		add_action( 'wp_ajax_saveDigthisAdminSettings', [ $this, 'saveSettings' ] );

	}

	public function getSettings() {
		$settings = get_option( 'digthisAdminSettings' );
		$settings = ! empty( $settings ) ? $settings : [ 'setting_1' => '', 'fixedBackground' => true ];
		wp_send_json( $settings );
	}

	/**
	 *
	 */
	public function saveSettings() {
		$request_body = file_get_contents( 'php://input' );
		$posted_data  = json_decode( $request_body, true );

		/*Bail Early*/
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		if ( empty( $posted_data['nonce'] ) ) {
			return;
		}

		if ( ! wp_verify_nonce( $posted_data['nonce'], 'digthisValidateNonce' ) ) {
			return;
		}

		update_option( 'digthisAdminSettings', $posted_data['settings'] );
		wp_send_json( [
			'settings' => $posted_data['settings'],
			'notice'   => [
				'status'  => 'success',
				'message' => 'Settings Saved'
			]
		] );
	}

	public function admin_menu_page() {
		$this->menu_page = add_menu_page(
			'Plugin Title',
			'Plugin Dashboard Title',
			'manage_options',
			$this->admin_page_url,
			array( $this, 'generate_admin_page' )
		);

	}

	/**
	 * @param $hook_suffix
	 */
	public function load_scripts( $hook_suffix ) {
		$script = [];
		if ( file_exists( PLUGIN_DIR . '/build/index.asset.php' ) ) {
			$script = include_once PLUGIN_DIR . '/build/index.asset.php';
		}
		$dependencies = array_unique( array_merge( $script['dependencies'], [ 'lodash', 'wp-api-fetch', 'wp-i18n', 'wp-components', 'wp-element' ] ) );
		wp_register_script( 'digthis-admin-script', PLUGIN_URL_PATH . 'build/index.js', $dependencies, $script['version'], true );
		wp_register_style( 'digthis-admin-style', PLUGIN_URL_PATH . 'build/style-index.css', [ 'wp-components' ], PLUGIN_VERSION );
		wp_localize_script( 'digthis-admin-script', 'digthisAdminObj', [
			'nonce' => wp_create_nonce( 'digthisValidateNonce' )
		] );

		if ( $hook_suffix == $this->menu_page ) {
			wp_enqueue_script( 'digthis-admin-script' );
			wp_enqueue_style( 'digthis-admin-style' );
		}
	}

	/**
	 *
	 */
	public function generate_admin_page() {
		require_once( PLUGIN_DIR . '/views/AdminArea/index.php' );
	}

}
