<div class="plugin-base-posts">
	<?php
	while ( $args['posts']->have_posts() ): $args['posts']->the_post();
		?>
        <h1><?php the_title(); ?></h1>
	<?php
	endwhile;
	wp_reset_postdata();
	?>
</div>