(function () {

	var datepicker = window.datepicker;

	var $wrapper;

	datepicker.buildUi = function (year, month) {
		
		var monthData = datepicker.getMonthData(year, month);
		var html = '<div class="ui-datepicker-header">' +
			'<a href="javascript:;" class="ui-datepicker-Btn prevBtn">&lt;</a>' +
			'<span class="ui-datepicker-currentMonth">' + monthData.year + '-' + monthData.month + '</span>' +
			'<a href="javascript:;" class="ui-datepicker-Btn nextBtn">&gt;</a>' +
		'</div>' +
		'<div class="ui-datepicker-body">' +
			'<table>' +
				'<thead>' +
					'<tr>' +
						'<th>周日</th>' +
						'<th>周一</th>' +
						'<th>周二</th>' +
						'<th>周三</th>' +
						'<th>周四</th>' +
						'<th>周五</th>' +
						'<th>周六</th>' +
					'</tr>' +
				'</thead>' +
				'<tbody>';

				for(var i = 0; i < monthData.days.length; i++){
					if(i%7 === 0){
						html += '<tr>';
					}
					html += '<td>' + monthData.days[i].date + '</td>';
					if(i%7 === 6){
						html += '</tr>';
					}
				}

				html += '</tbody>' +
			'</table>' +
		'</div>';

		return html;
	};

	datepicker.render = function(direction) {

		var currentMonth = document.querySelector('.ui-datepicker-currentMonth');
		var year = currentMonth.innerHTML.substring(0,4);
		var month = currentMonth.innerHTML.substring(5);

		if(direction === 'prev'){

			month--;

			if(month <=0){
				year--;
				month = 12;
			}
		}

		if(direction === 'next'){
			month++;
		}

		var html = datepicker.buildUi(year, month);
		$wrapper = document.querySelector('.ui-datepicker-wrapper');
		$wrapper.innerHTML = html;
	}

	datepicker.init = function(input) {

		var html = datepicker.buildUi();

		if(!$wrapper){
			$wrapper = document.createElement('div');
			document.body.appendChild($wrapper);
			$wrapper.className = 'ui-datepicker-wrapper';
		}
		$wrapper.innerHTML = html;

		var $input = document.querySelector(input);
		var isOpen = false;

		$input.addEventListener('click',function () {
			if(isOpen){
				$wrapper.classList.remove('ui-datepicker-wrapper-show');
				isOpen = false;
			}
			else{
				$wrapper.classList.add('ui-datepicker-wrapper-show');
				var left = $input.offsetLeft;
				var top = $input.offsetTop;
				var height = $input.offsetHeight;
				$wrapper.style.top = top + height + 2 + 'px';
				$wrapper.style.left = left + 'px';
				isOpen = true;
			}
		},false);

		$wrapper.addEventListener('click',function (e) {
			var $target = e.target;
			
			
			
			if(!$target.classList.contains('ui-datepicker-Btn')){
				/*break;*/
			}
			//上一个月
			if($target.classList.contains('prevBtn')){
				datepicker.render('prev');
			}
			else if($target.classList.contains('nextBtn')){
				datepicker.render('next');
			}
		},false);

	};

})();