(function () {
	var datepicker = {};

	datepicker.getMonthData = function (year, month) {
		
		var ret = [];

		if(!year || !month){
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}
		var firstDay = new Date(year, month - 1, 1);//本月第一天
		var firstDayIsWeekDay = firstDay.getDay();

		year = firstDay.getFullYear();
		month = firstDay.getMonth() + 1;

		var lastDayOfLastMonth = new Date(year, month - 1, 0);//上个月最后一天
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

		var lastDay = new Date(year, month, 0);//本月最后一天
		var lastDate = lastDay.getDate();

		var date = -firstDayIsWeekDay + 1;
		for(var i = 0; i < 42; i++, date++){
			var thisMonth;
			var showDate;

			if(date <= 0){
				thisMonth = month - 1;
				showDate = lastDateOfLastMonth + date;
			}
			else if(date > 0 && date <= lastDate){
				thisMonth = month;
				showDate = date;
			}
			else{
				thisMonth = month + 1;
				showDate = date - lastDate;
			}

			ret.push({
					month: thisMonth,
					date: showDate
				});
		}

		return {
			year: year,
			month: month,
			days: ret
		};
	};

	window.datepicker = datepicker;

})();