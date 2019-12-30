<form id="" class="" action="" method="post">
	<?php wp_nonce_field( 'verify_plugin_settings_nonce', 'plugin_settings_nonce' ); ?>
    <table class="form-table">
        <tr>
            <th><label for="email">Email</label></th>
            <td>
				<?php
				$email = '';
				if ( isset( $this->settings['email'] ) && ! empty( $this->settings['email'] ) ) {
					$email = $this->settings['email'];
				}
				?>
                <input type="email" id="email" name="email" value="<?php echo $email; ?>"/><br/>
                <span class="description">Email for plugin</span>
            </td>
        </tr>
        <tr>
			<?php
			$api_key = '';
			if ( isset( $this->settings['api-key'] ) && ! empty( $this->settings['api-key'] ) ) {
				$api_key = $this->settings['api-key'];
			}
			?>
            <th><label for="api-key">API Key</label></th>
            <td><input type="text" id="api-key" name="api-key" value="<?php echo $api_key; ?>"/></td>
        </tr>
    </table>
    <p class="submit">
        <input type="submit" class="button button-primary" value="save"/>
    </p>
</form>