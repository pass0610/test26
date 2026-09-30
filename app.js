const serviceData = [
  { 서비스ID: "S001", 서비스명: "주민등록등본 발급", 소관기관: "주민센터", 민원분야: "주민등록", 온라인처리: "가능", 처리기한일: 7, 수수료: 500 },
  { 서비스ID: "S002", 서비스명: "전입신고", 소관기관: "복지정책과", 민원분야: "주민등록", 온라인처리: "불가", 처리기한일: 1, 수수료: 0 },
  { 서비스ID: "S003", 서비스명: "인감증명 발급", 소관기관: "복지정책과", 민원분야: "주민등록", 온라인처리: "가능", 처리기한일: 1, 수수료: 0 },
  { 서비스ID: "S004", 서비스명: "주민등록증 재발급", 소관기관: "건축과", 민원분야: "주민등록", 온라인처리: "가능", 처리기한일: 0, 수수료: 0 },
  { 서비스ID: "S005", 서비스명: "건축물대장 발급", 소관기관: "구청 민원봉사과", 민원분야: "건축", 온라인처리: "불가", 처리기한일: 0, 수수료: 1000 },
  { 서비스ID: "S006", 서비스명: "건축허가 신청", 소관기관: "건축과", 민원분야: "건축", 온라인처리: "불가", 처리기한일: 1, 수수료: 2000 },
  { 서비스ID: "S007", 서비스명: "용도변경 신고", 소관기관: "시청 민원과", 민원분야: "건축", 온라인처리: "불가", 처리기한일: 0, 수수료: 0 },
  { 서비스ID: "S008", 서비스명: "지방세 납부확인서", 소관기관: "건축과", 민원분야: "세무", 온라인처리: "가능", 처리기한일: 1, 수수료: 1000 },
  { 서비스ID: "S009", 서비스명: "취득세 신고", 소관기관: "교통행정과", 민원분야: "세무", 온라인처리: "가능", 처리기한일: 0, 수수료: 0 },
  { 서비스ID: "S010", 서비스명: "재산세 조회", 소관기관: "교통행정과", 민원분야: "세무", 온라인처리: "가능", 처리기한일: 3, 수수료: 0 },
  { 서비스ID: "S011", 서비스명: "기초연금 신청", 소관기관: "건축과", 민원분야: "복지", 온라인처리: "가능", 처리기한일: 7, 수수료: 500 },
  { 서비스ID: "S012", 서비스명: "복지급여 조회", 소관기관: "시청 민원과", 민원분야: "복지", 온라인처리: "가능", 처리기한일: 14, 수수료: 5000 },
  { 서비스ID: "S013", 서비스명: "장애인 등록", 소관기관: "주민센터", 민원분야: "복지", 온라인처리: "가능", 처리기한일: 5, 수수료: 0 },
  { 서비스ID: "S014", 서비스명: "자동차 등록", 소관기관: "주민센터", 민원분야: "교통", 온라인처리: "가능", 처리기한일: 1, 수수료: 5000 },
  { 서비스ID: "S015", 서비스명: "운전면허 갱신", 소관기관: "교통행정과", 민원분야: "교통", 온라인처리: "불가", 처리기한일: 1, 수수료: 0 },
  { 서비스ID: "S016", 서비스명: "주정차 위반 조회", 소관기관: "주민센터", 민원분야: "교통", 온라인처리: "가능", 처리기한일: 7, 수수료: 1000 },
  { 서비스ID: "S017", 서비스명: "배출시설 신고", 소관기관: "주민센터", 민원분야: "환경", 온라인처리: "가능", 처리기한일: 1, 수수료: 0 },
  { 서비스ID: "S018", 서비스명: "폐기물 처리 신청", 소관기관: "시청 민원과", 민원분야: "환경", 온라인처리: "가능", 처리기한일: 14, 수수료: 5000 },
  { 서비스ID: "S019", 서비스명: "식품영업 신고", 소관기관: "건축과", 민원분야: "위생", 온라인처리: "가능", 처리기한일: 3, 수수료: 2000 },
  { 서비스ID: "S020", 서비스명: "위생업소 조회", 소관기관: "시청 민원과", 민원분야: "위생", 온라인처리: "불가", 처리기한일: 7, 수수료: 500 },
  { 서비스ID: "S021", 서비스명: "여권 발급 신청", 소관기관: "건축과", 민원분야: "여권", 온라인처리: "가능", 처리기한일: 7, 수수료: 1000 },
  { 서비스ID: "S022", 서비스명: "여권 재발급", 소관기관: "교통행정과", 민원분야: "여권", 온라인처리: "가능", 처리기한일: 1, 수수료: 1000 }
];

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const resetButton = document.getElementById("resetButton");
const serviceList = document.getElementById("serviceList");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

const categories = [...new Set(serviceData.map(service => service.민원분야))].sort((a, b) => a.localeCompare(b, "ko"));

categories.forEach(category => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categoryFilter.appendChild(option);
});

function formatFee(fee) {
  return fee === 0 ? "무료" : `${fee.toLocaleString("ko-KR")}원`;
}

function formatDays(days) {
  return days === 0 ? "즉시" : `${days}일`;
}

function createDetail(label, value, className = "") {
  const item = document.createElement("div");
  item.className = "detail-item";

  const labelElement = document.createElement("span");
  labelElement.className = "detail-label";
  labelElement.textContent = label;

  const valueElement = document.createElement("span");
  valueElement.className = `detail-value ${className}`.trim();
  valueElement.textContent = value;

  item.append(labelElement, valueElement);
  return item;
}

function createCard(service) {
  const card = document.createElement("article");
  card.className = "service-card";

  const top = document.createElement("div");
  top.className = "card-top";

  const titleGroup = document.createElement("div");
  const id = document.createElement("p");
  id.className = "service-id";
  id.textContent = service.서비스ID;

  const name = document.createElement("h3");
  name.className = "service-name";
  name.textContent = service.서비스명;
  titleGroup.append(id, name);

  const badge = document.createElement("span");
  badge.className = "category-badge";
  badge.textContent = service.민원분야;

  top.append(titleGroup, badge);

  const details = document.createElement("div");
  details.className = "detail-grid";
  details.append(
    createDetail("소관기관", service.소관기관),
    createDetail("온라인처리", service.온라인처리, service.온라인처리 === "가능" ? "online-possible" : "online-impossible"),
    createDetail("처리기한", formatDays(service.처리기한일)),
    createDetail("수수료", formatFee(service.수수료))
  );

  card.append(top, details);
  return card;
}

function renderServices() {
  const keyword = searchInput.value.trim().toLocaleLowerCase("ko-KR");
  const category = categoryFilter.value;

  const filtered = serviceData.filter(service => {
    const matchesKeyword = service.서비스명.toLocaleLowerCase("ko-KR").includes(keyword);
    const matchesCategory = category === "all" || service.민원분야 === category;
    return matchesKeyword && matchesCategory;
  });

  serviceList.replaceChildren(...filtered.map(createCard));
  resultCount.textContent = `총 ${filtered.length.toLocaleString("ko-KR")}건`;
  emptyState.hidden = filtered.length !== 0;
  serviceList.hidden = filtered.length === 0;
}

function resetFilters() {
  searchInput.value = "";
  categoryFilter.value = "all";
  renderServices();
  searchInput.focus();
}

searchInput.addEventListener("input", renderServices);
categoryFilter.addEventListener("change", renderServices);
resetButton.addEventListener("click", resetFilters);

renderServices();
