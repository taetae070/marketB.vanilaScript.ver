document.addEventListener("DOMContentLoaded", function () {
	//x 버튼
	const modalPop = document.querySelector(".first_modal");
	const closeBtn = modalPop.querySelector(".close");

	closeBtn.addEventListener("click", function () {
		modalPop.classList.toggle("modalHidden");
	});

	//메뉴버튼
	const menuBtn = document.querySelector(".mainNAV .menu_btn");
	const cateHead = document.querySelector(".category_list");
	const cateHeadAll = document.querySelectorAll(".category_list");
	const cateList01 = document.querySelectorAll(
		".category_list .catebox_1 > li"
	);
	// const cateList02 = document.querySelectorAll(".category_list .catebox_2 li");

	function menuClicked() {
		menuBtn.addEventListener("click", () => {
			cateHead.classList.toggle("visible");
		});
	}
	menuClicked();

	// categoryHead mouseout
	cateHeadAll.forEach(function (head) {
		head.addEventListener("mouseover", function () {
			const parentLi = head.parentElement;
			parentLi.classList.add("visible");
		});

		head.addEventListener("mouseout", function () {
			const parentLi = head.parentElement;
			parentLi.classList.remove("visible");
		});
	});

	function hoverEvent() {
		cateList01.forEach(function (list01) {
			list01.addEventListener("mouseover", function () {
				list01.classList.add("visible");

				const cateList02 = list01.querySelectorAll(".catebox_2 li");
				cateList02.forEach(function (list02) {
					list02.addEventListener("mouseover", function () {
						list02.classList.add("visible");
					});
				});
			});
		});
	}
	hoverEvent();

	// 위시리스트와 장바구니 버튼 관리 클래스 (Single Responsibility Principle)
	class WishCartButtonManager {
		constructor() {
			this.init();
		}

		// 초기화 메서드
		init() {
			this.bindEvents();
		}

		// 이벤트 바인딩 (Open-Closed Principle - 새로운 버튼 타입 추가 가능)
		bindEvents() {
			// 이벤트 위임을 사용하여 동적으로 생성되는 버튼도 처리
			document.addEventListener("click", (e) => {
				const target = e.target.closest(".wish_Btn, .cart_Btn");

				if (target) {
					e.preventDefault();
					e.stopPropagation();
					console.log("Button clicked:", target.className); // 디버깅 로그
					this.handleButtonClick(target);
				}
			});
		}

		// 버튼 클릭 처리 메서드
		handleButtonClick(button) {
			const buttonType = this.getButtonType(button);
			const alertContainer = this.findAlertContainer(button);

			console.log("Button type:", buttonType); // 디버깅 로그
			console.log("Alert container:", alertContainer); // 디버깅 로그

			if (!alertContainer) {
				console.warn("Alert container not found");
				return;
			}

			// 버튼 상태 토글
			this.toggleButtonState(button);

			// 알림 메시지 표시
			this.showAlert(button, buttonType, alertContainer);
		}

		// 버튼 타입 확인
		getButtonType(button) {
			return button.classList.contains("wish_Btn") ? "wish" : "cart";
		}

		// 알림 컨테이너 찾기 (다양한 페이지 구조에 대응)
		findAlertContainer(button) {
			// 1. 상세 페이지의 section02 영역 확인
			const section02 = button.closest(".section02");
			if (section02) {
				console.log("Found section02 container"); // 디버깅 로그
				// section02 내부에 alert 요소들이 있는지 확인
				const hasAlerts = section02.querySelector(
					".wish_alert01, .wish_alert02, .cart_alert01, .cart_alert02"
				);
				if (hasAlerts) {
					console.log("Found alerts in section02"); // 디버깅 로그
					return section02;
				} else {
					console.log("No alerts found in section02, checking document"); // 디버깅 로그
				}
			}

			// 2. 슬라이더 래퍼 영역 확인
			const sliderWrapper = button.closest(".slider_wrapper");
			if (sliderWrapper) {
				console.log("Found slider_wrapper container"); // 디버깅 로그
				// slider_wrapper 내부에 alert 요소들이 있는지 확인
				const hasAlerts = sliderWrapper.querySelector(
					".wish_alert01, .wish_alert02, .cart_alert01, .cart_alert02"
				);
				if (hasAlerts) {
					console.log("Found alerts in slider_wrapper"); // 디버깅 로그
					return sliderWrapper;
				} else {
					console.log("No alerts found in slider_wrapper, checking document"); // 디버깅 로그
				}
			}

			// 3. 전체 문서에서 찾기 (fallback)
			console.log("Using document as container"); // 디버깅 로그
			return document;
		}

		// 버튼 상태 토글
		toggleButtonState(button) {
			button.classList.toggle("on");
			console.log(
				'Button state toggled, has "on" class:',
				button.classList.contains("on")
			); // 디버깅 로그
		}

		// 알림 메시지 표시
		showAlert(button, buttonType, container) {
			const isActive = button.classList.contains("on");

			console.log("showAlert called with:", {
				buttonType,
				isActive,
				container,
			}); // 디버깅 로그

			const alertOn = container.querySelector(`.${buttonType}_alert01`);
			const alertOff = container.querySelector(`.${buttonType}_alert02`);

			console.log(
				"Alert selectors used:",
				`.${buttonType}_alert01`,
				`.${buttonType}_alert02`
			); // 디버깅 로그
			console.log("Alert elements found:", { alertOn, alertOff }); // 디버깅 로그

			// container 내의 모든 alert 요소들을 확인
			const allAlerts = container.querySelectorAll(
				".wish_alert01, .wish_alert02, .cart_alert01, .cart_alert02"
			);
			console.log("All alert elements in container:", allAlerts); // 디버깅 로그

			// 모든 알림 초기화
			this.clearAllAlerts(container);

			// 적절한 알림 표시
			if (isActive) {
				if (alertOn) {
					alertOn.classList.add("active");
					console.log('Added "active" to alertOn:', alertOn); // 디버깅 로그
				} else {
					console.warn(
						"alertOn element not found for selector:",
						`.${buttonType}_alert01`
					);
				}
			} else {
				if (alertOff) {
					alertOff.classList.add("active");
					console.log('Added "active" to alertOff:', alertOff); // 디버깅 로그
				} else {
					console.warn(
						"alertOff element not found for selector:",
						`.${buttonType}_alert02`
					);
				}
			}

			// 4초 후 알림 제거
			setTimeout(() => {
				this.clearAllAlerts(container);
				console.log("Alerts cleared after timeout"); // 디버깅 로그
			}, 4000);
		}

		// 모든 알림 클래스 제거
		clearAllAlerts(container) {
			const alerts = container.querySelectorAll(
				".wish_alert01, .wish_alert02, .cart_alert01, .cart_alert02"
			);
			alerts.forEach((alert) => alert.classList.remove("active"));
		}
	}

	// WishCartButtonManager 인스턴스 생성
	new WishCartButtonManager();

	// 각 li 요소에 클릭 이벤트를 추가
	const items = document.querySelectorAll(".bestList");

	items.forEach((item) => {
		const img = item.querySelector("img");
		const title = item.querySelector("h6");
		if (img) {
			img.addEventListener("click", (event) => {
				event.stopPropagation();
				const url =
					"https://taetae070.github.io/marketB.vanilaScript.ver/detail.html";
				window.location.href = url;
			});
		}

		if (title) {
			title.addEventListener("click", (event) => {
				event.stopPropagation();
				const url =
					"https://taetae070.github.io/marketB.vanilaScript.ver/detail.html";
				window.location.href = url;
			});
		}
	});

	const slide_start = document.querySelectorAll(".slider_wrapper");
	const imgWidth = document.querySelector(".bestList .bestItem img").width;
	const rowgap_value = parseInt(
		window.getComputedStyle(slide_start[0].querySelector("ul")).rowGap
	);

	slide_start.forEach(function (slider) {
		const slideUl = slider.querySelector("ul");
		const slides = slideUl.querySelectorAll("li");
		let currentIdx = 0;
		const slideCount = slides.length;
		const slideWidth = imgWidth;
		const slideToShow = 3;
		const prevBtn = slider.querySelector(".prev_btn");
		const nextBtn = slider.querySelector(".next_btn");

		// ul 너비지정
		slideUl.style.width =
			slideWidth * slideCount + rowgap_value * (slideCount - 1) + "px";

		// 슬라이드 이동함수
		function moveSlide(idx) {
			slideUl.style.left = -idx * (slideWidth + rowgap_value) + "px";
			currentIdx = idx;
		}
		moveSlide(currentIdx);

		// 버튼으로 이동하기
		nextBtn.addEventListener("click", function () {
			if (currentIdx === slideCount - slideToShow) {
				moveSlide(0);
			} else {
				moveSlide(currentIdx + 1);
			}
		});

		prevBtn.addEventListener("click", function () {
			if (currentIdx === 0) {
				moveSlide(slideCount - slideToShow);
			} else {
				moveSlide(currentIdx - 1);
			}
		});
	});

	//평점, 리뷰수 무작위
	function putRandomAndReviewNum() {
		document.querySelectorAll(".rating").forEach(function (el) {
			let randomRate = (Math.random() * 2 + 3).toFixed(1);
			if (randomRate > 5) {
				randomRate = 5;
			}
			el.setAttribute("data-rate", randomRate);
		});

		document.querySelectorAll(".review_num").forEach(function (el) {
			let randomNum = Math.ceil(Math.random() * 900) + 1000;
			el.innerHTML = `(${randomNum})`;

			let randomRate = (Math.random() * 2 + 3).toFixed(1);
			if (randomRate > 5) {
				randomRate = 5;
			}
			el.setAttribute("data-rate", randomRate);
		});
	}

	putRandomAndReviewNum();

	//random star rating
	const ratings = document.querySelectorAll(".rating");
	ratings.forEach(function (rating) {
		let starWraps = rating.querySelectorAll(".star-wrap"),
			scoreNum = rating.getAttribute("data-rate"),
			scoreArr = scoreNum.split("."); //ex) 4.5 -> ["4", "5"]

		if (scoreArr.length > 1) {
			let fullStars = parseInt(scoreArr[0], 10);
			for (let i = 0; i < fullStars; i++) {
				starWraps[i].querySelector(".star").style.width = "100%";
			}
			if (fullStars < starWraps.length) {
				starWraps[fullStars].querySelector(".star").style.width =
					scoreArr[1] * 10 + "%";
			}
		} else {
			for (let i = 0; i < scoreNum; i++) {
				starWraps[i].querySelector(".star").style.width = "100%";
			}
		}
	});
});
