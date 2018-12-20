$(document).ready(function(){
	sticky_sidebar();
	$("body").on("click", ".challenges .items", function(){
		$('#benchmark_teamplay_modal').modal('show');
	});
	$(window).on("scroll", function(){
		sticky_sidebar();
	});
});

function sticky_sidebar(){
	($(document).scrollTop() >= 80) ? $(".user_progress_dashboard >.dashboard_content").addClass("fixed_this_sidebar") 
									: $(".user_progress_dashboard >.dashboard_content").removeClass("fixed_this_sidebar");
}