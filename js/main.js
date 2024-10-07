jQuery(document).ready(function(){

	// cloneable-content accordion toggle when click title
	jQuery('.cl-title').on("click", function(){
		jQuery(this).toggleClass('clone-active')
			.next().stop().slideToggle(200)
			.parents('.cloneable-item')
			.siblings().find('.cloneable-content').slideUp(200)
			.prev().removeClass('clone-active');
	});


	// writing title when keyup title field
	jQuery('.cl-title-val').on("keyup", function(){
		var val = jQuery(this).val();
		jQuery(this).parents('.cloneable-item').find('.cl-placeholder').text(val);
		if(val.length > 0) {
			jQuery(this).parents('.cloneable-item').find('.cl-placeholder').addClass('cl-has-value');
		} else {
			jQuery(this).parents('.cloneable-item').find('.cl-placeholder').removeClass('cl-has-value');
		}
	});


	// clonable-item repeat when click Add New Button
	jQuery('.cloneable-add').on("click", function(e){
		e.preventDefault();
	    var cl_target = jQuery('.cloneable-fieldset > .cloneable-item.cl-hidden');
		var clone     = cl_target.clone(true);
		clone.appendTo('.clonable-wrapper');
	    jQuery('.clonable-wrapper .cloneable-item.cl-hidden')
	    	.removeClass('cl-hidden')
	    	.find('.cl-title').addClass('clone-active')
	    	.next('.cloneable-content').slideDown(200);

	    jQuery('.clonable-wrapper .cloneable-item:not(:last)')
	    	.find('.cl-title').removeClass('clone-active')
	    	.next('.cloneable-content').slideUp(200);
	});


	// clonable-item duplicate when click clone icon
	jQuery('.cl-clone').on("click", function(){
		var clone = jQuery(this).parents('.cloneable-item').clone(true);
	    jQuery(this).parents('.cloneable-item').after(clone)
	    	.next().find('.cloneable-content').slideUp(0)
	    	.prev().removeClass('clone-active');
	});


	// delete cloned item when click cross icon
	jQuery('.cl-remove').on("click", function(){
		if( confirm('Are you sure to delete this item?') === true ){
		    jQuery(this).parents('.cloneable-item').remove();
		}
	});


	// jQuery UI sortable for repeated items
	var sort = jQuery(".clonable-wrapper");	
	sort.sortable({
		axis: "y",
		helper: "orginal",
		cursor: "move",
		opacity: 0.9,
		handle: ".cl-sorting, .cl-title",
		placeholder: "cl-sort-highlight",
		start: function(e, ui) {
			jQuery(this).children().find('.cloneable-content').slideUp(0).prev().removeClass('clone-active');
			sort.sortable("refreshPositions");
		},
		stop: function( event, ui ) {
			ui.item.removeAttr("style");
      	}
	});

});