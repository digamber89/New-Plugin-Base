<div class="wrap">
    <div class="message">
		<?php
		$message = $this->get_message();
		if ( ! empty( $message ) && ! empty( $message ) ) {
			echo $message;
		}
		?>
    </div>
    <h2><?php _e('Plugin Settings Header','plugin-base'); ?></h2>
    <h2 class="nav-tab-wrapper">
		<?php do_action( 'add_settings_tab' ); ?>
        <a href="<?php echo add_query_arg( array(
			'page' => $this->admin_page_url,
			'tab'  => 'settings'
		), admin_url( 'admin.php' ) ); ?>"
           class="nav-tab <?php if ( ! ! empty( $_GET['tab'] ) || 'settings' === $_GET['tab'] ): ?> nav-tab-active<?php endif; ?>">
			<?php _e( 'Settings 1', 'plugin-base' ); ?>
        </a>
        <a href="<?php echo add_query_arg( array(
			'page' => $this->admin_page_url,
			'tab'  => 'check-balance'
		), admin_url( 'admin.php' ) ); ?>"
           class="nav-tab <?php if ( ! empty( $_GET['tab'] ) && 'check-balance' === $_GET['tab'] ): ?> nav-tab-active<?php endif; ?>">
			<?php _e( 'Settings 2', 'plugin-base' ); ?>
        </a>
    </h2>

	<?php
	if (  empty( $_GET['tab'] ) || $_GET['tab'] == 'settings' ) {
		require_once( PLUGIN_DIR . '/views/AdminArea/settings.php' );
	} elseif ( !empty( $_GET['tab'] ) && $_GET['tab'] == 'check-balance' ) {
		require_once( PLUGIN_DIR . '/views/AdminArea/more-settings.php' );
	}
	?>
</div>