;(function($){
	
	var Slider = function(ele, data, opts) {
		this.$element = ele
		this.data = data
		this.options = opts
	}

	Slider.prototype = {
		resize: function() {
			return $(this.$element).css({
				'width': this.options.width,
				'height': this.options.height, 
			})
		},
		insertImgs: function() {
			for (var i = 0; i < this.data.length; i++) {
				var img = document.createElement('img')
				$(img).attr('src', this.data[i].src)
					.attr('href', this.data[i].href || '')
					.attr('alt', this.data[i].alt || '轮播图' + (i + 1))
				    .css({
						width: this.options.width,
						height: this.options.height, 
						display: i === 0 ? 'inline' : 'none'
					})
				this.$element.append(img)
			}
			// this.cycleBtn()
			return $(this.$element)
		},

		cycleBtn: function() {
			var btnBox = document.createElement('div') // 用来放下方小圆形按钮的容器
			for (var i = 0; i < this.data.length; i++) {
				var button = document.createElement('span')
				$(button).css({
					width: (this.options.cycleRadius * 2) + 'px',
					height: (this.options.cycleRadius * 2) + 'px',
					margin: this.options.cycleRadius + 'px',
					'border-radius': '100%',
				}).bind('click', {data: i}, function() {
					this.switch(i)
				})
				btnBox.append(button)
			}
			$(btnBox).css({
				width: '100%',
				'line-height': 4 * this.cycleRadius + 'px',
				'text-align': 'center',
				'position': 'absolute',
				'bottom': 0
			})
			$(this.$element).css('position', 'relative').append(btnBox)
		},

		next: function() {
			var imgs = $(this.$element).children('img')
			var active = 0
			for (var i = 0; i < imgs.length; i++) {
				if (imgs[i].style.display === 'inline') {
					active = (i + 1 == imgs.length) ? 0 : i + 1
					imgs[i].style.display = 'none'
				}
			}
			imgs[active].style.display = 'inline'
		},

		switch: function(index) {
			clearInterval(this.timer)
			var imgs = $(this.$element).children('img')
			for (var i = 0; i < imgs.length; i++) {
				if (i !== index) {
					imgs[i].style.display = 'none'
				}
			}
			imgs[index].style.display = 'inline'
			this.start()
		},

		start: function() {
			var self = this
			this.timer = setInterval(function(){
				self.next()
			}, this.options.duration * 1000)
		},

		init: function() {
			this.resize()
			this.insertImgs()
			this.start()
		}
	}


	$.fn.wySlider = function(data, options){
		var defaults = {
			width: '100%',
			height: '240px',
			duration: 5,
			cycleRadius: 20,
			cycleColor: '#fff',
			cycleActiveColor: '#e5e5e5'
		}

		var $options = $.extend({}, defaults, options)

		return this.each(function(index, ele) {
			var slider = new Slider(ele, data, $options)
			return slider.init()
		})
	}


})(jQuery);
