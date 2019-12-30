<?php
namespace Digthis\AdminArea;
/**
 * Class plugin_admin
 */
class Admin {
	public static $instance;
	public $settings = '';
	public $plugin_url = 'plugin-url';
	private $message = null;

	/**
	 * @return Admin
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	/**
	 * plugin_admin constructor.
	 */
	public function __construct() {
		/*load dependencies if required*/
		$this->load_dependencies();
		add_action( 'admin_menu', array( $this, 'admin_menu_page' ) );
		add_action( 'admin_init', array( $this, 'save_settings' ) );

	}

	public function load_dependencies() {
	}

	public function admin_menu_page() {
		add_menu_page(
			'Plugin Title',
			'Plugin Dashboard Title',
			'manage_options',
			$this->plugin_url,
			array( $this, 'generate_admin_page' )
		);

	}

	public function generate_admin_page() {
		require_once( PLUGIN_DIR . '/templates/admin.php' );
	}

	/**
	 *
	 */
	public function save_settings() {
		if ( ! empty( $_POST['plugin_settings_nonce'] ) && wp_verify_nonce( $_POST['plugin_settings_nonce'], 'verify_plugin_settings_nonce' ) ) {
			/*Bail Early*/
			if ( ! current_user_can( 'manage_options' ) ) {
				return;
			}
			$config = array();
			if ( ! empty( $_POST['email'] ) && ! empty( $_POST['email'] ) ) {
				$config['email'] = $_POST['email'];
			}
			if ( ! empty( $_POST['api-key'] ) && ! empty( $_POST['api-key'] ) ) {
				$config['api-key'] = $_POST['api-key'];
			}
			update_option( 'my_plugin_settings', $config );
			$this->set_message( 'updated', 'Settings Saved' );
		}

		$this->settings = get_option( 'my_plugin_settings' );
	}

	public function set_message( $class, $message ) {
		$this->message = '<div class=' . $class . '>' . $message . '</div>';
	}

	public function get_message() {
		return $this->message;
	}

}
