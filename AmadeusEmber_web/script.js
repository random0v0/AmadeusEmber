// 전역 변수
let currentRound = 1;
let firstPlayerScore = 0;
let secondPlayerScore = 0;
let isPositionSwitched = false; // 선공/후공 위치 전환 상태
let selectedMapCard = null;
let finalMissionCard = null;
let missionCards = [];
let remainingMissionCards = 3;
let currentModalCard = null; // 현재 모달에서 선택된 카드
let selectedCustomMissions = []; // 커스텀 미션 선택 상태
let isCustomMissionSelected = false; // 커스텀 미션 선택 여부
let selectedFirstSecondaryCard = null; // 선공 세컨더리 카드
let selectedSecondSecondaryCard = null; // 후공 세컨더리 카드
let currentSecondaryPlayer = null; // 현재 선택 중인 플레이어 (first/second)
let isModalClosing = false; // 모달 닫기 중복 실행 방지

// 모달 스크롤 제어를 위한 변수
let scrollPosition = 0;

// 현재 언어 설정
let currentLanguage = 'kr';

// 언어 변경으로 인한 새로고침인지 확인하는 플래그
let isLanguageChangeReload = false;

// 언어별 텍스트 데이터
const textData = {
    kr: {
        mapCardSelection: '맵 카드 선택',
        mapDescription: '한 장만 선택 가능합니다.',
        mapSelection: '맵 선택 :',
        selectMapConfirm: '맵을 선택하시겠습니까?',
        select: '선택',
        close: '닫기',
        mainMissionCard: '메인미션 카드',
        missionDescription: '10개 중 3개가 랜덤으로 선택됩니다. 클릭하여 한 장씩 제거하세요.',
        remainingCards: '남은카드 :',
        customMissionSelection: '커스텀 미션 선택',
        customMissionDescription: '원하는 미션 카드를 선택하세요. 한 장만 선택 가능합니다.',
        selectComplete: '선택 완료',
        cancel: '취소',
        selectMissionConfirm: '미션 카드를 선택하시겠습니까?',
        remove: '제거',
        removeMissionConfirm: '미션 카드를 제거하시겠습니까?',
        secondaryMissionCard: '세컨더리 미션 카드',
        secondaryMissionDescription: '각각 한 장씩 선택 가능합니다.',
        firstPlayerSecondary: '선공 세컨더리 미션 카드',
        secondPlayerSecondary: '후공 세컨더리 미션 카드',
        firstPlayerDescription: '선공의 세컨더리 미션 카드를 선택하세요. 한 장만 선택 가능합니다.',
        selectSecondaryConfirm: '세컨더리 미션을 선택하시겠습니까?',
        secondPlayerDescription: '후공의 세컨더리 미션 카드를 선택하세요. 한 장만 선택 가능합니다.',
        selectedMap: '선택된 맵 :',
        finalMission: '메인미션 :',
        firstSecondary: '선공 세컨더리 :',
        secondSecondary: '후공 세컨더리 :',
        round: '라운드',
        first: '선공 점수',
        second: '후공 점수',
        firstLabel: '선공',
        secondLabel: '후공',
        map: '맵',
        mission: '미션',
        saveRecord: '기록저장',
        viewRecord: '기록보기',
        gameRecords: '게임 기록',
        close: '닫기',
        imageLoadFailed: '이미지를 불러올 수 없습니다',
        positionSwitched: '선공/후공 위치가 변경되었습니다',
        saveOnlyAtRound5: '5라운드에서만 기록을 저장할 수 있습니다',
        reset: '초기화',
        selectedCards: '선택된 카드',
        selectedCardsDescription: '이미지 클릭 시 확대됩니다.',
        empty: 'Empty',
        resetConfirmMessage: '모든 게임 데이터를 초기화하시겠습니까?\n\n이 작업은 되돌릴 수 없습니다.',
        // 알림 메시지들
        missionAlreadySelected: '이미 미션이 선택되었습니다.',
        selectAtLeastOneMission: '메인미션 카드를 선택해주세요.',
        customMissionAutoConfirmed: '커스텀 미션이 확정되었습니다!',
        customMissionsSet: '개의 미션 카드가 설정되었습니다! 클릭하여 하나를 선택하세요.',
        mapAlreadySelected: '이미 맵이 선택되어 있습니다. 초기화 후 다시 선택해주세요.',
        mapSelected: '맵이 선택되었습니다!',
        gameReset: '초기화되었습니다!',
        finalMissionDecided: '메인미션이 결정되었습니다!',
        secondaryCardAlreadySelected: '이미 세컨더리 카드가 선택되었습니다.',
        selectSecondaryMission: '세컨더리 미션 카드를 선택해주세요.',
        firstSecondarySelected: '선공 세컨더리 미션이 선택되었습니다!',
        secondSecondarySelected: '후공 세컨더리 미션이 선택되었습니다!',
        languageChanged: '언어가 변경되었습니다.',
        mobileOrientationTitle: '모바일 환경 안내',
        mobileOrientationDescription: '더 나은 이용을 위해 가로 모드를 권장드립니다.',
        confirm: '확인',
        nextStep: '다음 단계'
    },
    en: {
        mapCardSelection: 'Select a map',
        mapDescription: 'You can only select one.',
        mapSelection: 'Map :',
        selectMapConfirm: 'Do you want to select a map?',
        select: 'Confirm',
        close: 'Close',
        mainMissionCard: 'Main task',
        missionDescription: '3 out of 10 are randomly selected. Click to remove them one by one.',
        remainingCards: 'Remaining Cards :',
        customMissionSelection: 'Select a custom task',
        customMissionDescription: 'Select the task you want. You can only select one.',
        selectComplete: 'Select',
        cancel: 'Cancel',
        selectMissionConfirm: 'Do you want to select this main task?',
        remove: 'Remove',
        removeMissionConfirm: 'Do you want to remove this mission card?',
        secondaryMissionCard: 'Secondary task',
        secondaryMissionDescription: 'Each can be selected one by one.',
        firstPlayerSecondary: 'First Player Secondary Task',
        secondPlayerSecondary: 'Second Player Secondary Task',
        firstPlayerDescription: 'Please select the secondary task of the first ship. You can only select one.',
        selectSecondaryConfirm: 'Do you want to select a secondary task?',
        secondPlayerDescription: 'Please select the secondary task of the second ship. You can only select one.',
        selectedMap: 'Map :',
        finalMission: 'Main task :',
        firstSecondary: 'First Player Secondary :',
        secondSecondary: 'Second Player Secondary :',
        round: 'Round',
        first: 'First Score',
        second: 'Second Score',
        firstLabel: 'First',
        secondLabel: 'Second',
        map: 'Map',
        mission: 'Main task',
        saveRecord: 'Save Record',
        viewRecord: 'View Records',
        gameRecords: 'Game Records',
        close: 'Close',
        imageLoadFailed: 'Failed to load image',
        positionSwitched: 'Player positions have been switched',
        saveOnlyAtRound5: 'Records can only be saved at round 5',
        reset: 'Reset',
        selectedCards: 'Selected Cards',
        selectedCardsDescription: 'Click image to enlarge',
        empty: 'Empty',
        resetConfirmMessage: 'Do you want to reset all game data?\n\nThis action cannot be undone.',
        // 알림 메시지들
        missionAlreadySelected: 'Mission is already selected.',
        selectAtLeastOneMission: 'Please select at least one task.',
        customMissionAutoConfirmed: 'Custom task has been confirmed!',
        customMissionsSet: ' mission task have been set! Click to select one.',
        mapAlreadySelected: 'Map is already selected. Please reset and select again.',
        mapSelected: 'Map has been selected!',
        gameReset: 'Program has been reset!',
        finalMissionDecided: 'Main task has been decided!',
        secondaryCardAlreadySelected: 'Secondary task is already selected. Please reset and select again.',
        selectSecondaryMission: 'Please select a secondary task.',
        firstSecondarySelected: 'First player secondary task has been selected!',
        secondSecondarySelected: 'Second player secondary task has been selected!',
        languageChanged: 'Language has been changed',
        mobileOrientationTitle: 'Mobile Environment Notice',
        mobileOrientationDescription: 'For a better experience, we recommend using landscape mode.',
        confirm: 'Confirm',
        nextStep: 'Next Step'
    },
    jp: {
        mapCardSelection: 'マップカードの選択',
        mapDescription: '1枚のみ選択可能です。',
        mapSelection: 'マップ選択 :',
        selectMapConfirm: 'マップを選択しますか？',
        select: '選択',
        close: '閉じる',
        mainMissionCard: 'メインタスク',
        missionDescription: '10枚の中からランダムで3枚が選ばれます。クリックして1枚ずつ排除してください。',
        remainingCards: '残りのカード :',
        customMissionSelection: 'カスタムタスクの選択',
        customMissionDescription: ' お好みのタスクカードを選んでください。1枚のみ選択可能です。',
        selectComplete: '選択',
        cancel: 'キャンセル',
        selectMissionConfirm: 'このメインタスクを選択しますか？',
        remove: '削除',
        removeMissionConfirm: 'このメインタスクを削除しますか？',
        secondaryMissionCard: 'セカンダリータスク',
        secondaryMissionDescription: 'それぞれ1枚ずつ選択可能です。',
        firstPlayerSecondary: '先手セカンダリータスク',
        secondPlayerSecondary: '後手セカンダリータスク',
        firstPlayerDescription: '先手のセカンダリタスクを選択します。1つだけ選択可能です。',
        selectSecondaryConfirm: 'セカンダリタスクを選択しますか？',
        secondPlayerDescription: '後手のセカンダリタスクを選択します。1つだけ選択可能です。',
        selectedMap: 'マップ :',
        finalMission: 'メインタスク :',
        firstSecondary: '先手セカンダリータスク :',
        secondSecondary: '後手セカンダリータスク :',
        round: 'ターン',
        first: '先手スコア',
        second: '後手スコア',
        firstLabel: '先手',
        secondLabel: '後手',
        map: 'マップ',
        mission: 'メインタスク',
        saveRecord: '記録保存',
        viewRecord: '記録表示',
        gameRecords: 'ゲーム記録',
        close: '閉じる',
        imageLoadFailed: '画像を読み込めません',
        positionSwitched: '先手/後手の位置が変更されました',
        saveOnlyAtRound5: '5ラウンドでのみ記録を保存できます',
        reset: 'リセット',
        selectedCards: '選択されたカード',
        selectedCardsDescription: 'クリックして拡大表示',
        empty: 'Empty',
        resetConfirmMessage: 'すべてのゲームデータをリセットしますか？\n\nこの操作は元に戻せません。',
        // 알림 메시지들
        missionAlreadySelected: 'すでにタスクが選択されています。',
        selectAtLeastOneMission: 'メインタスクを選択してください。',
        customMissionAutoConfirmed: 'カスタムタスクが確定されました！',
        customMissionsSet: '枚のタスクが設定されました！クリックして1枚を選んでください。',
        mapAlreadySelected: 'すでにマップが選択されています。初期化後に再選択してください。',
        mapSelected: 'マップが選択されました！',
        gameReset: '初期化されました！',
        finalMissionDecided: 'メインタスクが決定されました！',
        secondaryCardAlreadySelected: 'すでにセカンダリータスクが選択されています。',
        selectSecondaryMission: 'セカンダリータスクを選択してください。',
        firstSecondarySelected: '先手のセカンダリータスクが選択されました！',
        secondSecondarySelected: '後手のセカンダリータスクが選択されました！',
        languageChanged: '言語が変更されました。',
        mobileOrientationTitle: 'モバイル環境のお知らせ',
        mobileOrientationDescription: 'より快適にご利用いただくため、横向きモードを推奨します。',
        confirm: '確認',
        nextStep: '次のステップ'
    },
    cn: {
        mapCardSelection: '请选择一张地图',
        mapDescription: '只能选择一张。',
        mapSelection: '地图 :',
        selectMapConfirm: '确定要选择地图吗？',
        select: '选择',
        close: '关闭',
        mainMissionCard: '主要任务卡',
        missionDescription: '10个中有3个是随机抽取的。 点击后逐个删除。',
        remainingCards: '剩余卡 :',
        customMissionSelection: '选择定制任务',
        customMissionDescription: '选择您喜欢的任务。 只能选择一个。',
        selectComplete: '选择',
        cancel: '取消',
        selectMissionConfirm: '确定要选择这个主要任务卡吗？',
        remove: '删除',
        removeMissionConfirm: '确定要删除这个任务卡吗？',
        secondaryMissionCard: '次要任务卡',
        secondaryMissionDescription: '每个可以单独选择。',
        firstPlayerSecondary: '先手次要任务卡',
        secondPlayerSecondary: '后手次要任务卡',
        firstPlayerDescription: '请选择先手的次要任务卡。 只能选择一个。',
        selectSecondaryConfirm: '确定要选择次要任务卡吗？',
        secondPlayerDescription: '请选择后手的次要任务卡。 只能选择一个。',
        selectedMap: '地图 :',
        finalMission: '主要任务卡 :',
        firstSecondary: '先手次要任务卡 :',
        secondSecondary: '后手次要任务卡 :',
        round: '回合',
        first: '先手分数',
        second: '后手分数',
        firstLabel: '先手',
        secondLabel: '后手',
        map: '地图',
        mission: '任务',
        saveRecord: '保存记录',
        viewRecord: '查看记录',
        gameRecords: '游戏记录',
        close: '关闭',
        imageLoadFailed: '无法加载图片',
        positionSwitched: '先手/后手位置已更改',
        saveOnlyAtRound5: '只能在第5回合保存记录',
        reset: '初始化',
        selectedCards: '已选择卡片',
        selectedCardsDescription: '点击图片放大',
        empty: 'Empty',
        resetConfirmMessage: '确定要重置所有游戏数据吗？\n\n此操作无法撤销。',
        // 알림 메시지들
        missionAlreadySelected: '已选择主要任务卡。',
        selectAtLeastOneMission: '请选择主要任务卡。',
        customMissionAutoConfirmed: '自定义任务已确认！',
        customMissionsSet: '已设置{0}张任务卡！点击选择一张。',
        mapAlreadySelected: '已选择战场。请重置后重新选择。',
        mapSelected: '战场已选择！',
        gameReset: '已重置！',
        finalMissionDecided: '主要任务已决定！',
        secondaryCardAlreadySelected: '已选择次要任务卡。',
        selectSecondaryMission: '请选择次要任务卡。',
        firstSecondarySelected: '先手的次要任务已选择！',
        secondSecondarySelected: '后手的次要任务已选择！',
        languageChanged: '语言已更改。',
        mobileOrientationTitle: '移动设备环境提示',
        mobileOrientationDescription: '为了获得更好的使用体验，建议使用横屏模式。',
        confirm: '确定',
        nextStep: '下一步'
    }
};

// 언어별 데이터
const languageData = {
    kr: {
        maps: [
            { name: '핫스팟', image: '핫스팟.png' },
            { name: '교차로', image: '교차로.png' },
            { name: '골목길', image: '골목길.png' }
        ],
        mainTasks: [
            { name: '블랙박스 파편복구', image: '블랙박스 파편복구.png' },
            { name: '통제구역 측면공격', image: '통제구역 측면공격.png' },
            { name: '통제구역 정면돌파', image: '통제구역 정면돌파.png' },
            { name: '통제구역 장거리운행', image: '통제구역 장거리운행.png' },
            { name: '블랙박스 중요시설', image: '블랙박스 중요시설.png' },
            { name: '블랙박스 자산보존', image: '블랙박스 자산보존.png' },
            { name: '단말기 지질탐사', image: '단말기 지질탐사.png' },
            { name: '단말기 신호수신', image: '단말기 신호수신.png' },
            { name: '단말기 데이터탈취', image: '단말기 데이터탈취.png' },
            { name: 'VIP', image: 'VIP.png' }
        ],
        subTasks: [
            { name: '호위', image: '호위.png' },
            { name: '현상금 사냥', image: '현상금 사냥.png' },
            { name: '폐기절차', image: '폐기절차.png' },
            { name: '참수', image: '참수.png' },
            { name: '전멸', image: '전멸.png' },
            { name: '잠재 발굴지', image: '잠재 발굴지.png' },
            { name: '자비로움', image: '자비로움.png' },
            { name: '무기 테스트', image: '무기 테스트.png' }
        ]
    },
    en: {
        maps: [
            { name: 'Hot Zone', image: 'Hot_Zone.png' },
            { name: 'Intersection', image: 'Intersection.png' },
            { name: 'Alley', image: 'Alley.png' }
        ],
        mainTasks: [
            { name: 'BB Frag Recovery', image: 'BB_Frag_Recovery.jpg' },
            { name: 'Control Outflank', image: 'Control_Outflank.jpg' },
            { name: 'Control Forward', image: 'Control_Forward.jpg' },
            { name: 'Control Long and Deep', image: 'Control_Long_and_Deep.jpg' },
            { name: 'BB Key Facility', image: 'BB_Key_Facility.jpg' },
            { name: 'BB Asset Preservation', image: 'BB_Asset_Preservation.jpg' },
            { name: 'Terminals Geo Exp', image: 'Terminals_Geo_Exp.jpg' },
            { name: 'Terminals Receive Signal', image: 'Terminals_Receive_Signal.jpg' },
            { name: 'Terminals Data Theft', image: 'Terminals_Data_Theft.jpg' },
            { name: 'VIP', image: 'VIP.jpg' }
        ],
        subTasks: [
            { name: 'Escortee', image: 'Escortee.png' },
            { name: 'Bounty', image: 'Bounty.png' },
            { name: 'Planned Obsolescence', image: 'Planned_Obsolescence.png' },
            { name: 'Behead', image: 'Behead.png' },
            { name: 'Annihilation', image: 'Annihilation.png' },
            { name: 'Excavation Claim', image: 'Excavation_Claim.png' },
            { name: 'Mercy', image: 'Mercy.png' },
            { name: 'Weapons Test', image: 'Weapons_Test.png' }
        ]
    },
    jp: {
        maps: [
            { name: 'ホットゾーン', image: 'ホットゾーン.png' },
            { name: '交差点', image: '交差点.png' },
            { name: '路地', image: '路地.png' }
        ],
        mainTasks: [
            { name: 'ブラックボックス-破片回収', image: 'ブラックボックス-破片回収.png' },
            { name: 'コントロールゾーン-側面攻擊', image: 'コントロールゾーン-側面攻擊.png' },
            { name: 'コントロールゾーン-正面衝突', image: 'コントロールゾーン-正面衝突.png' },
            { name: 'コントロールゾーン-長距離行軍', image: 'コントロールゾーン-長距離行軍.png' },
            { name: 'ブラックボックス-重要施設', image: 'ブラックボックス-重要施設.png' },
            { name: 'ブラックボックス-施設保全', image: 'ブラックボックス-施設保全.png' },
            { name: 'ターミナル-地質調查', image: 'ターミナル-地質調查.png' },
            { name: 'ターミナル-信号受信', image: 'ターミナル-信号受信.png' },
            { name: 'ターミナル-データ奪取', image: 'ターミナル-データ奪取.png' },
            { name: 'VIP', image: 'VIP.png' }
        ],
        subTasks: [
            { name: '護衛', image: '護衛.png' },
            { name: '賞金首', image: '賞金首.png' },
            { name: '計画的破棄', image: '計画的破棄.png' },
            { name: '斬首', image: '斬首.png' },
            { name: '殲滅', image: '殲滅.png' },
            { name: '採掘調査', image: '採掘調査.png' },
            { name: '慈悲', image: '慈悲.png' },
            { name: '武器テスト', image: '武器テスト.png' }
        ]
    },
    cn: {
        maps: [
            { name: '热点', image: '热点.png' },
            { name: '十字路口', image: '十字路口.png' },
            { name: '小巷', image: '小巷.png' }
        ],
        mainTasks: [
            { name: '黑箱碎片回收', image: '黑箱碎片回收.jpg' },
            { name: '占领侧翼包抄', image: '占领侧翼包抄.jpg' },
            { name: '占领正面推进', image: '占领正面推进.jpg' },
            { name: '占领长驱直入', image: '占领长驱直入.jpg' },
            { name: '黑箱关键设施', image: '黑箱关键设施.jpg' },
            { name: '黑箱资产保全', image: '黑箱资产保全.jpg' },
            { name: '终端地质勘探', image: '终端地质勘探.jpg' },
            { name: '终端接收信号', image: '终端接收信号.jpg' },
            { name: '终端窃取数据', image: '终端窃取数据.jpg' },
            { name: 'VIP', image: 'VIP.jpg' }
        ],
        subTasks: [
            { name: '护送', image: '护送.jpg' },
            { name: '悬赏击杀', image: '悬赏击杀.jpg' },
            { name: '计划报废', image: '计划报废.jpg' },
            { name: '斩首', image: '斩首.jpg' },
            { name: '歼灭', image: '歼灭.jpg' },
            { name: '潜在挖掘区', image: '潜在挖掘区.jpg' },
            { name: '仁慈', image: '仁慈.jpg' },
            { name: '武器测试', image: '武器测试.jpg' }
        ]
    }
};

// 미션 카드 데이터 (이미지 파일명 기반)
let allMissionCards = [
    { id: 0, title: '미션1', image: 'mission1.png' },
    { id: 1, title: '미션2', image: 'mission2.png' },
    { id: 2, title: '미션3', image: 'mission3.png' },
    { id: 3, title: '미션4', image: 'mission4.png' },
    { id: 4, title: '미션5', image: 'mission5.png' },
    { id: 5, title: '미션6', image: 'mission6.png' },
    { id: 6, title: '미션7', image: 'mission7.png' },
    { id: 7, title: '미션8', image: 'mission8.png' },
    { id: 8, title: '미션9', image: 'mission9.png' },
    { id: 9, title: '미션10', image: 'mission10.png' }
];

// 세컨더리 미션 카드 데이터
let allSecondaryMissionCards = [
    { id: 0, title: '서브미션1', image: 'submission1.png' },
    { id: 1, title: '서브미션2', image: 'submission2.png' },
    { id: 2, title: '서브미션3', image: 'submission3.png' },
    { id: 3, title: '서브미션4', image: 'submission4.png' },
    { id: 4, title: '서브미션5', image: 'submission5.png' }
];

// 페이지 로드 시 스플래시 스크린 처리 후 앱 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 스플래시 스크린이 완전히 로드될 때까지 잠시 대기
    setTimeout(() => {
        initializeApp();
    }, 100);
});

// 앱 초기화
function initializeApp() {
    // 자동 언어 감지 및 설정
    detectAndSetLanguage();
    
    // 스플래시 스크린 처리
    const splashScreen = document.getElementById('splashScreen');
    const container = document.querySelector('.container');
    
    // 3초 후 스플래시 스크린 사라지기
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        setTimeout(() => {
            splashScreen.style.display = 'none';
            // 메인 컨테이너 표시
            container.classList.add('show');
            // 모바일 환경에서 가로 모드 추천 모달 표시
            showMobileOrientationModal();
        }, 500);
    }, 3000);
    
    updateTexts();
    resetSelectedCards();
    updateScoreDisplay();
    updateRoundDisplay();
    
    // 선공 텍스트 효과 초기화
    updateFirstPlayerEffect();
    
    // 라운드 감소 버튼 초기 비활성화 (라운드 1에서는 감소 불가)
    document.getElementById('roundMinusBtn').disabled = true;
    
    // 전환 버튼 상태 초기화
    updateSwitchButtonState();
    
    // 기록저장 버튼 상태 초기화
    updateSaveRecordButtonState();
    
    // - 버튼 상태 초기화
    updateMinusButtonStates();
    
    // 이벤트 리스너 등록
    document.getElementById('roundPlusBtn').addEventListener('click', incrementRound);
    document.getElementById('roundMinusBtn').addEventListener('click', decrementRound);
    document.getElementById('customMissionBtn').addEventListener('click', showCustomMissionModal);
    document.getElementById('firstPlayerSecondaryBtn').addEventListener('click', () => showSecondaryMissionModal('first'));
    document.getElementById('secondPlayerSecondaryBtn').addEventListener('click', () => showSecondaryMissionModal('second'));
    document.getElementById('resetAllBtn').addEventListener('click', resetAllGame);
    
    // 다음 버튼 이벤트 리스너
    document.getElementById('nextToMissionBtn').addEventListener('click', () => showNextSections());
    document.getElementById('nextToSecondaryBtn').addEventListener('click', () => showSecondaryMissionSection());
    
    // 기록 버튼 이벤트 리스너
    document.getElementById('saveRecordBtn').addEventListener('click', saveGameRecord);
    document.getElementById('viewRecordBtn').addEventListener('click', viewGameRecords);
    
    // 모달 닫기 이벤트 (클릭 + 터치)
    window.addEventListener('click', function(event) {
        const mapModal = document.getElementById('mapModal');
        const missionModal = document.getElementById('missionModal');
        const customMissionModal = document.getElementById('customMissionModal');
        const secondaryMissionModal = document.getElementById('secondaryMissionModal');
        const mobileOrientationModal = document.getElementById('mobileOrientationModal');
        
        if (event.target === mapModal) {
            closeMapModal();
        }
        if (event.target === missionModal) {
            closeMissionModal();
        }
        if (event.target === customMissionModal) {
            closeCustomMissionModal();
        }
        if (event.target === secondaryMissionModal) {
            closeSecondaryMissionModal();
        }
        if (event.target === mobileOrientationModal) {
            closeMobileOrientationModal();
        }
    });
    
    // 터치 이벤트로 모달 닫기 (모바일 지원)
    window.addEventListener('touchend', function(event) {
        const mapModal = document.getElementById('mapModal');
        const missionModal = document.getElementById('missionModal');
        const customMissionModal = document.getElementById('customMissionModal');
        const secondaryMissionModal = document.getElementById('secondaryMissionModal');
        const mobileOrientationModal = document.getElementById('mobileOrientationModal');
        
        if (event.target === mapModal) {
            closeMapModal();
        }
        if (event.target === missionModal) {
            closeMissionModal();
        }
        if (event.target === customMissionModal) {
            closeCustomMissionModal();
        }
        if (event.target === secondaryMissionModal) {
            closeSecondaryMissionModal();
        }
        if (event.target === mobileOrientationModal) {
            closeMobileOrientationModal();
        }
    });
    
    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const mapModal = document.getElementById('mapModal');
            const missionModal = document.getElementById('missionModal');
            const customMissionModal = document.getElementById('customMissionModal');
            const secondaryMissionModal = document.getElementById('secondaryMissionModal');
            const mobileOrientationModal = document.getElementById('mobileOrientationModal');
            
            if (mapModal.style.display === 'block') {
                closeMapModal();
            }
            if (missionModal.style.display === 'block') {
                closeMissionModal();
            }
            if (customMissionModal.style.display === 'block') {
                closeCustomMissionModal();
            }
            if (secondaryMissionModal.style.display === 'block') {
                closeSecondaryMissionModal();
            }
            if (mobileOrientationModal.style.display === 'block') {
                closeMobileOrientationModal();
            }
        }
    });
    
    // 모달 내부 스크롤 방지 (모바일에서 확대 시)
    const modals = ['mapModal', 'missionModal', 'customMissionModal', 'secondaryMissionModal', 'mobileOrientationModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.addEventListener('touchmove', function(event) {
                // 모달 내부에서만 스크롤 허용
                if (event.target.closest('.modal-body') || event.target.closest('.custom-mission-grid')) {
                    return;
                }
                event.preventDefault();
            }, { passive: false });
        }
    });
}

// 자동 언어 감지 및 설정 함수
function detectAndSetLanguage() {
    // 언어 변경으로 인한 새로고침인지 확인
    const isLanguageChange = localStorage.getItem('isLanguageChangeReload') === 'true';
    const selectedLanguage = localStorage.getItem('selectedLanguage');
    
    if (isLanguageChange && selectedLanguage) {
        // 언어 변경으로 인한 새로고침인 경우 저장된 언어 사용
        currentLanguage = selectedLanguage;
        localStorage.removeItem('isLanguageChangeReload');
        localStorage.removeItem('selectedLanguage');
        updateLanguageSelectUI();
        return;
    }
    
    // 브라우저 언어 설정 가져오기
    const browserLanguage = navigator.language || navigator.userLanguage;
    
    // 지원하는 언어 목록
    const supportedLanguages = ['kr', 'en', 'jp', 'cn'];
    
    // 언어 코드 매핑 (브라우저 언어 -> 앱 언어)
    const languageMapping = {
        'ko': 'kr',           // 한국어
        'ko-KR': 'kr',        // 한국어 (한국)
        'en': 'en',           // 영어
        'en-US': 'en',        // 영어 (미국)
        'en-GB': 'en',        // 영어 (영국)
        'ja': 'jp',           // 일본어
        'ja-JP': 'jp',        // 일본어 (일본)
        'zh': 'cn',           // 중국어
        'zh-CN': 'cn',        // 중국어 (간체)
        'zh-TW': 'cn',        // 중국어 (번체)
        'zh-HK': 'cn'         // 중국어 (홍콩)
    };
    
    // 기본 언어 (영어)
    let detectedLanguage = 'en';
    
    // 1. 정확한 매칭 시도
    if (languageMapping[browserLanguage]) {
        detectedLanguage = languageMapping[browserLanguage];
    } else {
        // 2. 언어 코드만 추출하여 매칭 시도 (예: 'ko-KR' -> 'ko')
        const primaryLanguage = browserLanguage.split('-')[0];
        if (languageMapping[primaryLanguage]) {
            detectedLanguage = languageMapping[primaryLanguage];
        } else {
            // 3. 지원하는 언어 목록에서 부분 매칭 시도
            for (const lang of supportedLanguages) {
                if (browserLanguage.toLowerCase().includes(lang)) {
                    detectedLanguage = lang;
                    break;
                }
            }
        }
    }
    
    // 언어 설정 적용
    currentLanguage = detectedLanguage;
    
    // 언어 선택 UI 업데이트 (select 요소 값 설정)
    updateLanguageSelectUI();
    
    console.log(`Browser language: ${browserLanguage}, Detected language: ${detectedLanguage}`);
}

// 언어 선택 UI 업데이트 함수 (select 요소용)
function updateLanguageSelectUI() {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }
}

// 커스텀 미션 선택 모달 표시
function showCustomMissionModal() {
    // 최종 미션이 결정되었거나 커스텀 미션이 선택된 경우 초기화 후 선택 가능하다는 팝업 표시
    if (finalMissionCard || isCustomMissionSelected) {
        showNotification(textData[currentLanguage].missionAlreadySelected, 'info');
        return;
    }
    
    // 모달 닫기 플래그 초기화
    isModalClosing = false;
    
    const texts = textData[currentLanguage];
    
    // 모달 제목과 설명 설정
    document.getElementById('customMissionModalTitle').textContent = texts.customMissionSelection;
    document.getElementById('customMissionModalDescription').textContent = texts.customMissionDescription;
    
    // 버튼 텍스트 설정
    document.getElementById('customMissionConfirmBtn').textContent = texts.selectComplete;
    document.getElementById('customMissionCancelBtn').textContent = texts.cancel;
    
    const customMissionGrid = document.getElementById('customMissionGrid');
    customMissionGrid.innerHTML = '';
    selectedCustomMissions = [];
    
    // 현재 언어의 메인 미션 카드들 생성
    const currentMainTasks = languageData[currentLanguage].mainTasks;
    currentMainTasks.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'custom-mission-card';
        cardElement.innerHTML = `
            <img src="data/maintask/${currentLanguage}/${card.image}" alt="${card.name}">
            <h4>${card.name}</h4>
        `;
        
        // 이미지 에러 처리 추가
        const img = cardElement.querySelector('img');
        handleImageError(img, card.name);
        
        cardElement.addEventListener('click', () => toggleCustomMissionSelection(cardElement, card, index));
        customMissionGrid.appendChild(cardElement);
    });
    
    // body 스크롤 방지 (모달 표시 전에 먼저 실행)
    preventBodyScroll();
    
    // 모달 표시
    document.getElementById('customMissionModal').style.display = 'block';
}

// 커스텀 미션 선택 토글
function toggleCustomMissionSelection(cardElement, card, index) {
    // 확대 보기 모달 표시
    const missionTitle = cardElement.querySelector('h4').textContent;
    const missionImage = cardElement.querySelector('img').src;
    const texts = textData[currentLanguage];
    
    // 모달 내용 설정
    document.getElementById('missionModalTitle').textContent = `${texts.mainMissionCard}: ${missionTitle}`;
    document.getElementById('missionModalImage').src = missionImage;
    document.getElementById('missionModalImage').alt = missionTitle;
    document.getElementById('missionModalDescription').textContent = `"${missionTitle}" ${texts.removeMissionConfirm}`;
    
    // 버튼 설정 (선택 모드)
    const confirmBtn = document.getElementById('missionModalConfirmBtn');
    confirmBtn.textContent = texts.select;
    confirmBtn.onclick = () => {
        // 카드 선택 로직
        const isSelected = cardElement.classList.contains('selected');
        
        if (isSelected) {
            // 이미 선택된 카드는 선택 해제하지 않음 (무시)
            closeMissionModal();
            return;
        } else {
            // 기존 선택된 카드들 모두 해제
            const selectedCards = document.querySelectorAll('.custom-mission-card.selected');
            selectedCards.forEach(selectedCard => {
                selectedCard.classList.remove('selected');
            });
            selectedCustomMissions = [];
            
            // 새 카드 선택
            cardElement.classList.add('selected');
            selectedCustomMissions.push(card);
        }
        
        closeMissionModal();
    };
    
    // 닫기 버튼 텍스트 설정
    const closeBtn = document.getElementById('missionModalCloseBtn');
    if (closeBtn) closeBtn.textContent = texts.close;
    
    // 모달 표시
    document.getElementById('missionModal').style.display = 'block';
}

// 커스텀 미션 선택 모달 닫기
function closeCustomMissionModal() {
    if (isModalClosing) return;
    isModalClosing = true;
    
    const modal = document.getElementById('customMissionModal');
    modal.classList.add('closing');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
        selectedCustomMissions = [];
        isModalClosing = false;
        
        // body 스크롤 복원
        restoreBodyScroll();
    }, 300);
}

// 커스텀 미션 선택 확인
function confirmCustomMissionSelection() {
    if (selectedCustomMissions.length === 0) {
        showNotification(textData[currentLanguage].selectAtLeastOneMission, 'info');
        return;
    }
    
    // 선택된 미션으로 게임 설정
    missionCards = selectedCustomMissions;
    remainingMissionCards = selectedCustomMissions.length;
    isCustomMissionSelected = true; // 커스텀 선택 플래그 설정
    
    // 미션 카드 재생성 (커스텀 선택으로 표시)
    generateMissionCards();
    
    // 커스텀 미션 1개만 선택된 경우 자동으로 최종 미션으로 설정
    if (selectedCustomMissions.length === 1) {
        const selectedCard = selectedCustomMissions[0];
        finalMissionCard = selectedCard;
        
        // 최종 미션 업데이트
        const selectedMissionDisplay = document.getElementById('selectedMissionDisplay');
        selectedMissionDisplay.innerHTML = `
            <p id="finalMission">${selectedCard.name}</p>
            <img src="data/maintask/${currentLanguage}/${selectedCard.image}" alt="${selectedCard.name}" style="width: 100%; max-width: 140px; height: auto; border-radius: 8px; margin-top: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); cursor: pointer;" onclick="showSelectedMissionImage()">
        `;
        
        // 모든 미션 카드 비활성화
        const missionCards = document.querySelectorAll('.mission-card');
        missionCards.forEach(card => {
            card.style.pointerEvents = 'none';
            card.classList.add('removed');
        });
        
        // 선택된 카드만 활성화하고 강조 (이름으로 찾기)
        const selectedCardElement = document.querySelector(`.mission-card h3[data-mission-name="${selectedCard.name}"]`)?.closest('.mission-card') || 
                                   document.querySelector('.mission-card');
        if (selectedCardElement) {
            selectedCardElement.classList.remove('removed');
            selectedCardElement.classList.add('selected');
        }
        
        showNotification(textData[currentLanguage].customMissionAutoConfirmed, 'success');
        
        // 남은 카드 텍스트 숨기기
        const remainingCardsLabel = document.getElementById('remainingCardsLabel');
        if (remainingCardsLabel) {
            remainingCardsLabel.style.display = 'none';
        }
        const remainingCardsElement = document.getElementById('remainingCards');
        if (remainingCardsElement) {
            remainingCardsElement.style.display = 'none';
        }
        
        // 다음 버튼 표시
        const nextToSecondaryBtn = document.getElementById('nextToSecondaryBtn');
        if (nextToSecondaryBtn) {
            nextToSecondaryBtn.style.display = 'block';
        }
    } else {
        // 선택 상태 초기화 (여러 개 선택된 경우)
        finalMissionCard = null;
        document.getElementById('finalMission').textContent = 'Empty';
        const selectedMissionDisplay = document.getElementById('selectedMissionDisplay');
        selectedMissionDisplay.innerHTML = '<p id="finalMission">Empty</p>';
        
        showNotification(selectedCustomMissions.length + textData[currentLanguage].customMissionsSet, 'success');
    }
    
    // 커스텀 미션 버튼 숨기기
    const customMissionBtn = document.getElementById('customMissionBtn');
    customMissionBtn.style.display = 'none';
    
    closeCustomMissionModal();
}

// 커스텀 미션 확정 함수 (커스텀 미션 중 하나를 최종 미션으로 선택)
function confirmCustomMission(cardElement, card) {
    // 확대 보기 모달 표시
    const missionTitle = cardElement.querySelector('h3').textContent;
    const missionImage = cardElement.querySelector('.card-image').src;
    
    // 모달 내용 설정
    document.getElementById('missionModalTitle').textContent = `미션 카드: ${missionTitle}`;
    document.getElementById('missionModalImage').src = missionImage;
    document.getElementById('missionModalImage').alt = missionTitle;
    document.getElementById('missionModalDescription').textContent = `"${missionTitle}" 미션 카드입니다.`;
    
    // 버튼 설정 (확대 보기 모드)
    const confirmBtn = document.getElementById('missionModalConfirmBtn');
    confirmBtn.textContent = '확인';
    confirmBtn.onclick = closeMissionModal;
    
    // 모달 표시
    document.getElementById('missionModal').style.display = 'block';
}

// 맵 선택 모달 표시
function showMapModal(cardElement) {
    // 이미 맵이 선택되어 있으면 선택 불가
    if (selectedMapCard) {
        showNotification(textData[currentLanguage].mapAlreadySelected, 'info');
        return;
    }
    
    // 모달 닫기 플래그 초기화
    isModalClosing = false;
    
    const mapTitle = cardElement.querySelector('h3').textContent;
    const mapImage = cardElement.querySelector('.card-image').src;
    const texts = textData[currentLanguage];
    
    // 모달 내용 설정
    document.getElementById('mapModalTitle').textContent = `${texts.mapSelection} ${mapTitle}`;
    document.getElementById('mapModalImage').src = mapImage;
    document.getElementById('mapModalImage').alt = mapTitle;
    // 맵 이미지 크기를 더 크게 설정
    document.getElementById('mapModalImage').style.maxWidth = '90vw';
    document.getElementById('mapModalImage').style.maxHeight = '70vh';
    document.getElementById('mapModalImage').style.objectFit = 'contain';
    document.getElementById('mapModalDescription').textContent = `"${mapTitle}" ${texts.selectMapConfirm}`;
    
    // 버튼 설정 (선택 모드)
    const confirmBtn = document.getElementById('mapModalConfirmBtn');
    confirmBtn.textContent = texts.select;
    confirmBtn.onclick = confirmMapSelection;
    
    // 닫기 버튼 텍스트 설정
    const closeBtn = document.getElementById('mapModalCloseBtn');
    if (closeBtn) closeBtn.textContent = texts.close;
    
    // 현재 카드 저장
    currentModalCard = cardElement;
    
    // body 스크롤 방지 (모달 표시 전에 먼저 실행)
    preventBodyScroll();
    
    // 모달 표시
    document.getElementById('mapModal').style.display = 'block';
}

// 맵 선택 모달 닫기
function closeMapModal() {
    if (isModalClosing) return;
    isModalClosing = true;
    
    const modal = document.getElementById('mapModal');
    modal.classList.add('closing');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
        currentModalCard = null;
        isModalClosing = false;
        
        // body 스크롤 복원
        restoreBodyScroll();
    }, 300);
}

// 맵 선택 확인
function confirmMapSelection() {
    if (currentModalCard) {
        selectMapCard(currentModalCard);
        closeMapModal();
        showNotification(textData[currentLanguage].mapSelected, 'success');
    }
}

// 미션 제거 모달 표시
function showMissionModal(cardElement) {
    // 모달 닫기 플래그 초기화
    isModalClosing = false;
    
    const missionTitle = cardElement.querySelector('h3').textContent;
    const missionImage = cardElement.querySelector('.card-image').src;
    const texts = textData[currentLanguage];
    
    // 모달 내용 설정
    document.getElementById('missionModalTitle').textContent = `${texts.mainMissionCard} : ${missionTitle}`;
    document.getElementById('missionModalImage').src = missionImage;
    document.getElementById('missionModalImage').alt = missionTitle;
    // 메인 미션 이미지 크기 설정
    document.getElementById('missionModalImage').style.maxWidth = '90vw';
    document.getElementById('missionModalImage').style.maxHeight = '70vh';
    document.getElementById('missionModalImage').style.objectFit = 'contain';
    document.getElementById('missionModalDescription').textContent = `"${missionTitle}" ${texts.removeMissionConfirm}`;
    
    // 버튼 설정 (제거 모드)
    const confirmBtn = document.getElementById('missionModalConfirmBtn');
    confirmBtn.textContent = texts.remove;
    confirmBtn.onclick = confirmMissionRemoval;
    
    // 닫기 버튼 텍스트 설정
    const closeBtn = document.getElementById('missionModalCloseBtn');
    if (closeBtn) {
        closeBtn.textContent = texts.close;
        closeBtn.onclick = closeMissionModal; // 미션 제거 모달용 닫기 함수
    }
    
    // 현재 카드 저장
    currentModalCard = cardElement;
    
    // body 스크롤 방지 (모달 표시 전에 먼저 실행)
    preventBodyScroll();
    
    // 모달 표시
    document.getElementById('missionModal').style.display = 'block';
}

// 미션 제거 모달 닫기
function closeMissionModal() {
    if (isModalClosing) return;
    isModalClosing = true;
    
    const modal = document.getElementById('missionModal');
    modal.classList.add('closing');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
        
        // 모든 모달 상태 초기화
        const confirmBtn = document.getElementById('missionModalConfirmBtn');
        const description = document.getElementById('missionModalDescription');
        const modalImage = document.getElementById('missionModalImage');
        
        // 확인 버튼 다시 표시 (이미지 확대 모달에서는 숨겨져 있을 수 있음)
        if (confirmBtn.style.display === 'none') {
            confirmBtn.style.display = 'inline-block';
        }
        // 설명 다시 표시 (이미지 확대 모달에서는 숨겨져 있을 수 있음)
        if (description.style.display === 'none') {
            description.style.display = 'block';
        }
        // 이미지 스타일 초기화
        modalImage.style.maxWidth = '';
        modalImage.style.maxHeight = '';
        modalImage.style.objectFit = '';
        
        currentModalCard = null;
        isModalClosing = false;
        
        // body 스크롤 복원
        restoreBodyScroll();
    }, 300);
}

// 미션 제거 확인
function confirmMissionRemoval() {
    if (currentModalCard) {
        removeMissionCard(currentModalCard);
        closeMissionModal();
    }
}

// 전체 게임 초기화 함수
function resetAllGame() {
    if (confirm(textData[currentLanguage].resetConfirmMessage)) {
        // 모달 닫기 플래그 초기화
        isModalClosing = false;
        
        // 모든 변수 초기화
        currentRound = 1;
        firstPlayerScore = 0;
        secondPlayerScore = 0;
        isPositionSwitched = false; // 전환 상태 초기화
        selectedMapCard = null;
        finalMissionCard = null;
        remainingMissionCards = 3;
        selectedCustomMissions = [];
        isCustomMissionSelected = false; // 커스텀 선택 플래그 초기화
        missionCards = []; // 미션 카드 배열 초기화
        selectedFirstSecondaryCard = null; // 선공 세컨더리 카드 초기화
        selectedSecondSecondaryCard = null; // 후공 세컨더리 카드 초기화
        currentSecondaryPlayer = null; // 현재 선택 중인 플레이어 초기화
        
        // UI 초기화 - 모든 섹션 숨기기
        const sectionsToHide = ['.mission-section', '.secondary-mission-section', '.selected-section', '.round-section', '.score-section', '.record-section'];
        sectionsToHide.forEach(selector => {
            const section = document.querySelector(selector);
            if (section) {
                section.style.display = 'none';
                if (selector === '.score-section') {
                    section.classList.remove('show');
                }
            }
        });
        
        // 맵 섹션만 표시
        const mapSection = document.querySelector('.map-section');
        if (mapSection) {
            mapSection.style.display = 'block';
        }
        
        // 다음 버튼들 숨기기
        const nextToMissionBtn = document.getElementById('nextToMissionBtn');
        const nextToSecondaryBtn = document.getElementById('nextToSecondaryBtn');
        if (nextToMissionBtn) nextToMissionBtn.style.display = 'none';
        if (nextToSecondaryBtn) nextToSecondaryBtn.style.display = 'none';
        
        const mapCards = document.querySelectorAll('.map-card');
        mapCards.forEach(card => {
            card.classList.remove('selected', 'disabled', 'removed');
            card.style.pointerEvents = 'auto';
        });
        
        document.getElementById('selectedMap').textContent = 'Empty';
        document.getElementById('finalMission').textContent = 'Empty';
        
        // 선택된 이미지 제거
        const selectedMapDisplay = document.getElementById('selectedMapDisplay');
        const selectedMissionDisplay = document.getElementById('selectedMissionDisplay');
        const selectedFirstSecondaryDisplay = document.getElementById('selectedFirstSecondaryDisplay');
        const selectedSecondSecondaryDisplay = document.getElementById('selectedSecondSecondaryDisplay');
        selectedMapDisplay.innerHTML = '<p id="selectedMap">Empty</p>';
        selectedMissionDisplay.innerHTML = '<p id="finalMission">Empty</p>';
        selectedFirstSecondaryDisplay.innerHTML = '<p id="selectedFirstSecondary">Empty</p>';
        selectedSecondSecondaryDisplay.innerHTML = '<p id="selectedSecondSecondary">Empty</p>';
        
        // 라운드 버튼 활성화/비활성화 설정
        const roundPlusBtn = document.getElementById('roundPlusBtn');
        const roundMinusBtn = document.getElementById('roundMinusBtn');
        roundPlusBtn.disabled = false;
        roundMinusBtn.disabled = true; // 라운드 1에서는 감소 버튼 비활성화
        
        // 커스텀 미션 버튼 활성화
        const customMissionBtn = document.getElementById('customMissionBtn');
        customMissionBtn.style.display = 'block';
        
        // 세컨더리 미션 버튼 활성화
        const firstPlayerSecondaryBtn = document.getElementById('firstPlayerSecondaryBtn');
        const secondPlayerSecondaryBtn = document.getElementById('secondPlayerSecondaryBtn');
        firstPlayerSecondaryBtn.disabled = false;
        firstPlayerSecondaryBtn.style.opacity = '1';
        firstPlayerSecondaryBtn.style.cursor = 'pointer';
        secondPlayerSecondaryBtn.disabled = false;
        secondPlayerSecondaryBtn.style.opacity = '1';
        secondPlayerSecondaryBtn.style.cursor = 'pointer';
        
        // 미션 카드 리셋 (랜덤 3개)
        generateMissionCards();
        
        // 남은 카드 텍스트 다시 표시
        const remainingCardsLabel = document.getElementById('remainingCardsLabel');
        if (remainingCardsLabel) {
            remainingCardsLabel.style.display = 'inline';
        }
        const remainingCardsElement = document.getElementById('remainingCards');
        if (remainingCardsElement) {
            remainingCardsElement.style.display = 'inline';
        }
        
        // 점수와 라운드 업데이트
        updateScoreDisplay();
        updateRoundDisplay();
        
        // 성공 메시지 표시
        showNotification(textData[currentLanguage].gameReset, 'success');
        
        // 페이지 즉시 새로고침
        location.reload();
    }
}

// 알림 표시 함수
function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 새 알림 생성
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 스타일 적용
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'info' ? '#2196F3' : '#ff9800'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        font-weight: bold;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    // 3초 후 자동 제거
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// 라운드 증가 함수
function incrementRound() {
    if (currentRound < 5) {
        currentRound++;
        updateRoundDisplay();
        
        // 선공 텍스트 애니메이션 트리거
        triggerFirstPlayerAnimation();
        
        // 라운드가 5에 도달하면 버튼 비활성화
        if (currentRound === 5) {
            document.getElementById('roundPlusBtn').disabled = true;
        }
        
        // 라운드가 1보다 크면 감소 버튼 활성화
        if (currentRound > 1) {
            document.getElementById('roundMinusBtn').disabled = false;
        }
        
        // 전환 버튼 활성화/비활성화 업데이트
        updateSwitchButtonState();
        
        // 기록저장 버튼 상태 업데이트
        updateSaveRecordButtonState();
    }
}

// 라운드 감소 함수
function decrementRound() {
    if (currentRound > 1) {
        currentRound--;
        updateRoundDisplay();
        
        // 선공 텍스트 애니메이션 트리거
        triggerFirstPlayerAnimation();
        
        // 라운드가 1에 도달하면 감소 버튼 비활성화
        if (currentRound === 1) {
            document.getElementById('roundMinusBtn').disabled = true;
        }
        
        // 라운드가 5보다 작으면 증가 버튼 활성화
        if (currentRound < 5) {
            document.getElementById('roundPlusBtn').disabled = false;
        }
        
        // 전환 버튼 활성화/비활성화 업데이트
        updateSwitchButtonState();
        
        // 기록저장 버튼 상태 업데이트
        updateSaveRecordButtonState();
    }
}

// 선공 텍스트 효과 업데이트 함수
function updateFirstPlayerEffect() {
    const leftLabel = document.getElementById('leftPlayerLabel');
    const rightLabel = document.getElementById('rightPlayerLabel');
    const texts = textData[currentLanguage];
    
    // 모든 라벨에서 선공 효과 제거
    if (leftLabel) leftLabel.classList.remove('first-player', 'animate');
    if (rightLabel) rightLabel.classList.remove('first-player', 'animate');
    
    // 전환 상태와 라운드를 모두 고려하여 선공 결정
    let isLeftFirst = false;
    
    if (isPositionSwitched) {
        // 전환된 상태: 기본 라운드 로직의 반대
        isLeftFirst = (currentRound % 2 === 0); // 짝수 라운드에 왼쪽이 선공
    } else {
        // 기본 상태: 라운드에 따라 결정
        isLeftFirst = (currentRound % 2 === 1); // 홀수 라운드에 왼쪽이 선공
    }
    
    // 현재 선공 텍스트에 지속적인 그라데이션 효과 적용
    if (isLeftFirst) {
        // 왼쪽이 선공
        if (leftLabel && leftLabel.textContent === texts.firstLabel) {
            leftLabel.classList.add('first-player');
        }
    } else {
        // 오른쪽이 선공
        if (rightLabel && rightLabel.textContent === texts.firstLabel) {
            rightLabel.classList.add('first-player');
        }
    }
}

// 선공 텍스트 애니메이션 트리거 함수
function triggerFirstPlayerAnimation() {
    const leftLabel = document.getElementById('leftPlayerLabel');
    const rightLabel = document.getElementById('rightPlayerLabel');
    const texts = textData[currentLanguage];
    
    // 전환 상태와 라운드를 모두 고려하여 선공 결정
    let isLeftFirst = false;
    
    if (isPositionSwitched) {
        // 전환된 상태: 기본 라운드 로직의 반대
        isLeftFirst = (currentRound % 2 === 0); // 짝수 라운드에 왼쪽이 선공
    } else {
        // 기본 상태: 라운드에 따라 결정
        isLeftFirst = (currentRound % 2 === 1); // 홀수 라운드에 왼쪽이 선공
    }
    
    // 현재 선공 텍스트에 애니메이션 클래스 추가
    if (isLeftFirst) {
        // 왼쪽이 선공
        if (leftLabel && leftLabel.textContent === texts.firstLabel) {
            leftLabel.classList.add('animate');
        }
    } else {
        // 오른쪽이 선공
        if (rightLabel && rightLabel.textContent === texts.firstLabel) {
            rightLabel.classList.add('animate');
        }
    }
    
    // 3초 후 애니메이션 클래스 제거 (지속적인 그라데이션은 유지)
    setTimeout(() => {
        if (leftLabel) leftLabel.classList.remove('animate');
        if (rightLabel) rightLabel.classList.remove('animate');
    }, 3000);
}

// 라운드 표시 업데이트
function updateRoundDisplay() {
    document.getElementById('roundCounter').textContent = currentRound;
    updateScoreOrder();
}

// 점수 카드 순서 변경
function updateScoreOrder() {
    const leftLabel = document.getElementById('leftPlayerLabel');
    const rightLabel = document.getElementById('rightPlayerLabel');
    const texts = textData[currentLanguage];
    
    // 전환 상태와 라운드를 모두 고려하여 선공/후공 결정
    let isLeftFirst = false;
    
    if (isPositionSwitched) {
        // 전환된 상태: 기본 라운드 로직의 반대
        isLeftFirst = (currentRound % 2 === 0); // 짝수 라운드에 왼쪽이 선공
    } else {
        // 기본 상태: 라운드에 따라 결정
        isLeftFirst = (currentRound % 2 === 1); // 홀수 라운드에 왼쪽이 선공
    }
    
    // 텍스트 설정
    if (isLeftFirst) {
        // 왼쪽이 선공, 오른쪽이 후공
        leftLabel.textContent = texts.firstLabel;
        rightLabel.textContent = texts.secondLabel;
    } else {
        // 왼쪽이 후공, 오른쪽이 선공
        leftLabel.textContent = texts.secondLabel;
        rightLabel.textContent = texts.firstLabel;
    }
    
    // 선공 텍스트 효과 업데이트
    updateFirstPlayerEffect();
}

// 선공/후공 위치 전환 함수
function switchPlayerPositions() {
    // 라운드 1에서만 전환 가능
    if (currentRound !== 1) {
        return;
    }
    
    // 전환 상태 토글
    isPositionSwitched = !isPositionSwitched;
    
    // 점수 변수 교체
    const tempFirstScore = firstPlayerScore;
    firstPlayerScore = secondPlayerScore;
    secondPlayerScore = tempFirstScore;
    
    // DOM 요소의 점수 업데이트
    const leftScore = document.getElementById('firstPlayerScore');
    const rightScore = document.getElementById('secondPlayerScore');
    leftScore.textContent = firstPlayerScore;
    rightScore.textContent = secondPlayerScore;
    
    // 점수 카드 순서 업데이트
    updateScoreOrder();
    
    // - 버튼 상태 업데이트
    updateMinusButtonStates();
    
    // 전환 완료 알림
    showNotification(textData[currentLanguage].positionSwitched || '선공/후공 위치가 변경되었습니다', 'success');
}

// 전환 버튼 상태 업데이트 함수
function updateSwitchButtonState() {
    const switchBtn = document.getElementById('scoreSwitchBtn');
    if (switchBtn) {
        // 라운드 1에서만 활성화
        switchBtn.disabled = (currentRound !== 1);
    }
}

// - 버튼 상태 업데이트 함수
function updateMinusButtonStates() {
    // 왼쪽 점수 카드의 - 버튼
    const leftScore = parseInt(document.getElementById('firstPlayerScore').textContent) || 0;
    const firstMinusBtn = document.querySelector('.score-card:first-child .score-btn.minus');
    if (firstMinusBtn) {
        firstMinusBtn.disabled = (leftScore === 0);
        firstMinusBtn.style.opacity = (leftScore === 0) ? '0.5' : '1';
        firstMinusBtn.style.cursor = (leftScore === 0) ? 'not-allowed' : 'pointer';
    }
    
    // 오른쪽 점수 카드의 - 버튼
    const rightScore = parseInt(document.getElementById('secondPlayerScore').textContent) || 0;
    const secondMinusBtn = document.querySelector('.score-card:last-child .score-btn.minus');
    if (secondMinusBtn) {
        secondMinusBtn.disabled = (rightScore === 0);
        secondMinusBtn.style.opacity = (rightScore === 0) ? '0.5' : '1';
        secondMinusBtn.style.cursor = (rightScore === 0) ? 'not-allowed' : 'pointer';
    }
}

// 기록저장 버튼 상태 업데이트 함수
function updateSaveRecordButtonState() {
    const saveRecordBtn = document.getElementById('saveRecordBtn');
    if (saveRecordBtn) {
        // 5라운드에서만 활성화
        saveRecordBtn.disabled = (currentRound !== 5);
        
        // 버튼 스타일 업데이트
        if (currentRound === 5) {
            saveRecordBtn.style.opacity = '1';
            saveRecordBtn.style.cursor = 'pointer';
        } else {
            saveRecordBtn.style.opacity = '0.6';
            saveRecordBtn.style.cursor = 'not-allowed';
        }
    }
}

// 점수 변경 함수
function changeScore(player, change) {
    if (player === 'first') {
        const newScore = firstPlayerScore + change;
        if (newScore >= 0) {
            firstPlayerScore = newScore;
            document.getElementById('firstPlayerScore').textContent = firstPlayerScore;
            
            // 실제 화면에 표시되는 점수로 - 버튼 상태 결정
            const actualScore = parseInt(document.getElementById('firstPlayerScore').textContent) || 0;
            const firstMinusBtn = document.querySelector('.score-card:first-child .score-btn.minus');
            if (firstMinusBtn) {
                firstMinusBtn.disabled = (actualScore === 0);
                firstMinusBtn.style.opacity = (actualScore === 0) ? '0.5' : '1';
                firstMinusBtn.style.cursor = (actualScore === 0) ? 'not-allowed' : 'pointer';
            }
        }
    } else if (player === 'second') {
        const newScore = secondPlayerScore + change;
        if (newScore >= 0) {
            secondPlayerScore = newScore;
            document.getElementById('secondPlayerScore').textContent = secondPlayerScore;
            
            // 실제 화면에 표시되는 점수로 - 버튼 상태 결정
            const actualScore = parseInt(document.getElementById('secondPlayerScore').textContent) || 0;
            const secondMinusBtn = document.querySelector('.score-card:last-child .score-btn.minus');
            if (secondMinusBtn) {
                secondMinusBtn.disabled = (actualScore === 0);
                secondMinusBtn.style.opacity = (actualScore === 0) ? '0.5' : '1';
                secondMinusBtn.style.cursor = (actualScore === 0) ? 'not-allowed' : 'pointer';
            }
        }
    }
}

// 점수 표시 업데이트
function updateScoreDisplay() {
    document.getElementById('firstPlayerScore').textContent = firstPlayerScore;
    document.getElementById('secondPlayerScore').textContent = secondPlayerScore;
    
    // - 버튼들의 상태 업데이트
    const firstMinusBtn = document.querySelector('.score-card:first-child .score-btn.minus');
    const secondMinusBtn = document.querySelector('.score-card:last-child .score-btn.minus');
    
    if (firstMinusBtn) {
        firstMinusBtn.disabled = (firstPlayerScore === 0);
        firstMinusBtn.style.opacity = (firstPlayerScore === 0) ? '0.5' : '1';
        firstMinusBtn.style.cursor = (firstPlayerScore === 0) ? 'not-allowed' : 'pointer';
    }
    
    if (secondMinusBtn) {
        secondMinusBtn.disabled = (secondPlayerScore === 0);
        secondMinusBtn.style.opacity = (secondPlayerScore === 0) ? '0.5' : '1';
        secondMinusBtn.style.cursor = (secondPlayerScore === 0) ? 'not-allowed' : 'pointer';
    }
}

// 맵 카드 선택 함수
function selectMapCard(cardElement) {
    // 기존 선택 해제
    const mapCards = document.querySelectorAll('.map-card');
    mapCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    // 새 카드 선택
    cardElement.classList.add('selected');
    selectedMapCard = cardElement;
    
    // 선택된 맵 정보 업데이트
    const mapTitle = cardElement.querySelector('h3').textContent;
    const mapImage = cardElement.querySelector('.card-image').src;
    
    // 선택된 맵 표시 영역 업데이트 (클릭 가능하도록 수정)
    const selectedMapDisplay = document.getElementById('selectedMapDisplay');
    selectedMapDisplay.innerHTML = `
        <p id="selectedMap">${mapTitle}</p>
        <img src="${mapImage}" alt="${mapTitle}" style="width: 100%; max-width: 140px; height: auto; border-radius: 8px; margin-top: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); cursor: pointer;" onclick="showSelectedMapImage()">
    `;
    
    // 선택된 맵 외의 다른 맵들 제거
    mapCards.forEach(card => {
        if (card !== cardElement) {
            card.classList.add('removed');
            card.style.pointerEvents = 'none';
        }
    });
    
    // 선택된 맵 카드도 클릭 불가능하게 설정
    cardElement.style.pointerEvents = 'none';
    
    // 다음 버튼 표시
    const nextToMissionBtn = document.getElementById('nextToMissionBtn');
    if (nextToMissionBtn) {
        nextToMissionBtn.style.display = 'block';
    }
}

// 미션 카드 생성 함수
function generateMissionCards() {
    const missionCardsContainer = document.getElementById('missionCards');
    missionCardsContainer.innerHTML = '';
    
    // 커스텀 선택이 없으면 랜덤 3개 선택
    if (missionCards.length === 0) {
        const currentMainTasks = languageData[currentLanguage].mainTasks;
        const shuffled = currentMainTasks.sort(() => 0.5 - Math.random());
        missionCards = shuffled.slice(0, 3);
        isCustomMissionSelected = false; // 랜덤 선택으로 설정
    }
    
    remainingMissionCards = missionCards.length;
    
    // 미션 카드 DOM 요소 생성
    missionCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card mission-card';
        cardElement.innerHTML = `
            <img src="data/maintask/${currentLanguage}/${card.image}" alt="${card.name}" class="card-image">
            <h3 data-mission-name="${card.name}">${card.name}</h3>
        `;
        
        // 이미지 에러 처리 추가
        const img = cardElement.querySelector('img');
        handleImageError(img, card.name);
        
        // 커스텀 선택이 아닐 때만 제거 기능 활성화
        if (!isCustomMissionSelected) {
            cardElement.addEventListener('click', () => showMissionModal(cardElement));
        } else {
            // 커스텀 선택 시 클릭 시 확정 기능
            cardElement.addEventListener('click', () => confirmCustomMission(cardElement, card));
        }
        
        missionCardsContainer.appendChild(cardElement);
    });
    
    // 남은 카드 수 업데이트
    updateRemainingCards();
}

// 미션 카드 제거 함수
function removeMissionCard(cardElement) {
    if (remainingMissionCards > 1) {
        // 카드 제거 표시
        cardElement.classList.add('removed');
        cardElement.style.pointerEvents = 'none';
        
        // 남은 카드 수 감소
        remainingMissionCards--;
        updateRemainingCards();
        
        // 1개 이상 제거 시 커스텀 미션 버튼 숨기기
        const customMissionBtn = document.getElementById('customMissionBtn');
        customMissionBtn.style.display = 'none';
        
        // 마지막 카드가 남았을 때
        if (remainingMissionCards === 1) {
            const remainingCard = document.querySelector('.mission-card:not(.removed)');
            if (remainingCard) {
                remainingCard.classList.add('selected');
                
                // 남은 카드의 이름으로 배열에서 찾기
                const remainingCardName = remainingCard.querySelector('h3').textContent;
                finalMissionCard = missionCards.find(card => card.name === remainingCardName);
                
                // 클릭 이벤트 제거 (제거 모달이 뜨지 않도록)
                remainingCard.style.pointerEvents = 'none';
                
                // 최종 미션 업데이트
                const missionTitle = remainingCard.querySelector('h3').textContent;
                const missionImage = remainingCard.querySelector('.card-image').src;
                
                // 선택된 미션 표시 영역 업데이트 (클릭 가능하도록)
                const selectedMissionDisplay = document.getElementById('selectedMissionDisplay');
                selectedMissionDisplay.innerHTML = `
                    <p id="finalMission">${missionTitle}</p>
                    <img src="${missionImage}" alt="${missionTitle}" style="width: 100%; max-width: 140px; height: auto; border-radius: 8px; margin-top: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); cursor: pointer;" onclick="showSelectedMissionImage()">
                `;
                
                showNotification(textData[currentLanguage].finalMissionDecided, 'success');
                
                // 남은 카드 텍스트 숨기기
                const remainingCardsLabel = document.getElementById('remainingCardsLabel');
                if (remainingCardsLabel) {
                    remainingCardsLabel.style.display = 'none';
                }
                const remainingCardsElement = document.getElementById('remainingCards');
                if (remainingCardsElement) {
                    remainingCardsElement.style.display = 'none';
                }
                
                // 다음 버튼 표시
                const nextToSecondaryBtn = document.getElementById('nextToSecondaryBtn');
                if (nextToSecondaryBtn) {
                    nextToSecondaryBtn.style.display = 'block';
                }
            }
        }
    }
}

// 남은 카드 수 업데이트
function updateRemainingCards() {
    document.getElementById('remainingCards').textContent = remainingMissionCards;
}

// 터치 이벤트 지원 (모바일)
document.addEventListener('touchstart', function() {}, {passive: true});

// 키보드 단축키 지원
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
            event.preventDefault();
            if (event.ctrlKey) {
                changeScore('first', 1);
            } else {
                changeScore('second', 1);
            }
            break;
        case 'ArrowDown':
            event.preventDefault();
            if (event.ctrlKey) {
                changeScore('first', -1);
            } else {
                changeScore('second', -1);
            }
            break;
        case ' ':
            event.preventDefault();
            incrementRound();
            break;
        case 'Backspace':
            event.preventDefault();
            decrementRound();
            break;
        case 'm':
            if (event.ctrlKey) {
                event.preventDefault();
                showCustomMissionModal();
            }
            break;
    }
});

// 게임 리셋 함수 (기존 함수 - 호환성 유지)
function resetGame() {
    resetAllGame();
}

// 전역 함수로 노출 (HTML에서 호출하기 위해)
window.showMapModal = showMapModal;
window.closeMapModal = closeMapModal;
window.confirmMapSelection = confirmMapSelection;
window.showMissionModal = showMissionModal;
window.closeMissionModal = closeMissionModal;
window.confirmMissionRemoval = confirmMissionRemoval;
window.showCustomMissionModal = showCustomMissionModal;
window.closeCustomMissionModal = closeCustomMissionModal;
window.confirmCustomMissionSelection = confirmCustomMissionSelection;
window.confirmCustomMission = confirmCustomMission;
window.changeScore = changeScore;
window.resetGame = resetGame;
window.closeMobileOrientationModal = closeMobileOrientationModal;

// 모달이 열려있는지 확인하는 헬퍼 함수
function isAnyModalOpen() {
    const modals = ['mapModal', 'missionModal', 'customMissionModal', 'secondaryMissionModal', 'mobileOrientationModal'];
    return modals.some(modalId => {
        const modal = document.getElementById(modalId);
        return modal && modal.style.display === 'block';
    });
}

// 모바일 기기 감지 함수
function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Android 기기 감지
    if (/android/i.test(userAgent)) {
        return true;
    }
    
    // iOS 기기 감지 (iPhone, iPad, iPod)
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return true;
    }
    
    return false;
}

// 모바일 가로 모드 추천 모달 표시
function showMobileOrientationModal() {
    // 모바일 기기(Android, iOS)에서만 표시
    if (!isMobileDevice()) {
        return;
    }
    
    // 다른 모달이 열려있는지 확인
    if (isAnyModalOpen()) {
        // 다른 모달이 열려있으면 잠시 후 다시 시도
        setTimeout(() => showMobileOrientationModal(), 500);
        return;
    }
    
    // 모달 닫기 플래그 초기화
    isModalClosing = false;
    
    const texts = textData[currentLanguage];
    
    // 모달 텍스트 설정
    document.getElementById('mobileOrientationModalTitle').textContent = texts.mobileOrientationTitle;
    document.getElementById('mobileOrientationModalDescription').textContent = texts.mobileOrientationDescription;
    document.getElementById('mobileOrientationModalConfirmBtn').textContent = texts.confirm;
    
    // body 스크롤 방지 (모달 표시 전에 먼저 실행)
    preventBodyScroll();
    
    document.getElementById('mobileOrientationModal').style.display = 'block';
}

// 모바일 가로 모드 추천 모달 닫기
function closeMobileOrientationModal() {
    if (isModalClosing) return;
    isModalClosing = true;
    
    const modal = document.getElementById('mobileOrientationModal');
    modal.classList.add('closing');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
        isModalClosing = false;
        
        // body 스크롤 복원
        restoreBodyScroll();
    }, 300);
}

// 세컨더리 미션 선택 모달 표시
function showSecondaryMissionModal(player) {
    // 이미 해당 플레이어의 세컨더리 카드가 선택된 경우
    if ((player === 'first' && selectedFirstSecondaryCard) || (player === 'second' && selectedSecondSecondaryCard)) {
        showNotification(textData[currentLanguage].secondaryCardAlreadySelected, 'info');
        return;
    }
    
    // 모달이 이미 열려있지 않을 때만 플래그 초기화
    const modal = document.getElementById('secondaryMissionModal');
    if (modal.style.display !== 'block') {
        isModalClosing = false;
    }
    
    currentSecondaryPlayer = player;
    const texts = textData[currentLanguage];
    const playerName = player === 'first' ? texts.firstLabel : texts.secondLabel;
    
    // 모달 제목과 설명 설정
    document.getElementById('secondaryMissionModalTitle').textContent = `${playerName} ${texts.secondaryMissionCard}`;
    document.getElementById('secondaryMissionModalDescription').textContent = player === 'first' ? texts.firstPlayerDescription : texts.secondPlayerDescription;
    
    // 버튼 텍스트 설정
    document.getElementById('secondaryMissionConfirmBtn').textContent = texts.selectComplete;
    document.getElementById('secondaryMissionCancelBtn').textContent = texts.cancel;
    
    const secondaryMissionGrid = document.getElementById('secondaryMissionGrid');
    secondaryMissionGrid.innerHTML = '';
    
    // 현재 언어의 세컨더리 미션 카드들 생성
    const currentSubTasks = languageData[currentLanguage].subTasks;
    currentSubTasks.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'custom-mission-card';
        cardElement.innerHTML = `
            <img src="data/subtask/${currentLanguage}/${card.image}" alt="${card.name}">
            <h4>${card.name}</h4>
        `;
        
        // 이미지 에러 처리 추가
        const img = cardElement.querySelector('img');
        handleImageError(img, card.name);
        
        cardElement.addEventListener('click', () => toggleSecondaryMissionSelection(cardElement, card, index));
        secondaryMissionGrid.appendChild(cardElement);
    });
    
    // body 스크롤 방지 (모달 표시 전에 먼저 실행)
    preventBodyScroll();
    
    // 모달 표시
    document.getElementById('secondaryMissionModal').style.display = 'block';
}

// 세컨더리 미션 선택 토글
function toggleSecondaryMissionSelection(cardElement, card, index) {
    // 확대 보기 모달 표시
    const secondaryTitle = cardElement.querySelector('h4').textContent;
    const secondaryImage = cardElement.querySelector('img').src;
    const texts = textData[currentLanguage];
    
    // 모달 내용 설정
    document.getElementById('missionModalTitle').textContent = `${texts.secondaryMissionCard}: ${secondaryTitle}`;
    document.getElementById('missionModalImage').src = secondaryImage;
    document.getElementById('missionModalImage').alt = secondaryTitle;
    // 세컨더리 미션 이미지 크기를 선택된 세컨더리 카드 확대 보기와 동일하게 설정
    document.getElementById('missionModalImage').style.maxWidth = '75vw';
    document.getElementById('missionModalImage').style.maxHeight = '55vh';
    document.getElementById('missionModalImage').style.objectFit = 'contain';
    document.getElementById('missionModalDescription').textContent = `"${secondaryTitle}" ${texts.selectSecondaryConfirm}`;
    
    // 버튼 설정 (선택 모드)
    const confirmBtn = document.getElementById('missionModalConfirmBtn');
    confirmBtn.textContent = texts.select;
    confirmBtn.onclick = () => {
        // 카드 선택 로직
        const isSelected = cardElement.classList.contains('selected');
        
        if (isSelected) {
            // 이미 선택된 카드는 선택 해제하지 않음 (무시)
            closeMissionModal();
            return;
        } else {
            // 기존 선택된 카드들 모두 해제
            const selectedCards = document.querySelectorAll('#secondaryMissionGrid .custom-mission-card.selected');
            selectedCards.forEach(selectedCard => {
                selectedCard.classList.remove('selected');
            });
            
            // 새 카드 선택
            cardElement.classList.add('selected');
        }
        
        closeMissionModal();
    };
    
    // 닫기 버튼 텍스트 설정
    const closeBtn = document.getElementById('missionModalCloseBtn');
    if (closeBtn) closeBtn.textContent = texts.close;
    
    // 모달 표시
    document.getElementById('missionModal').style.display = 'block';
}

// 세컨더리 미션 선택 모달 닫기
function closeSecondaryMissionModal() {
    if (isModalClosing) return;
    isModalClosing = true;
    
    const modal = document.getElementById('secondaryMissionModal');
    modal.classList.add('closing');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
        currentSecondaryPlayer = null;
        isModalClosing = false;
        
        // body 스크롤 복원
        restoreBodyScroll();
    }, 300);
}

// 세컨더리 미션 선택 확인
function confirmSecondaryMissionSelection() {
    const selectedCard = document.querySelector('#secondaryMissionGrid .custom-mission-card.selected');
    
    if (!selectedCard) {
        showNotification(textData[currentLanguage].selectSecondaryMission, 'info');
        return;
    }
    
    const cardTitle = selectedCard.querySelector('h4').textContent;
    const cardImage = selectedCard.querySelector('img').src;
    
    // 선택된 카드 정보 저장
    const selectedCardData = {
        id: cardTitle, // 제목을 ID로 사용
        title: cardTitle,
        image: cardImage.split('/').pop() // 파일명만 추출
    };
    
    if (currentSecondaryPlayer === 'first') {
        selectedFirstSecondaryCard = selectedCardData;
        updateFirstSecondaryDisplay(selectedCardData);
        document.getElementById('firstPlayerSecondaryBtn').disabled = true;
        document.getElementById('firstPlayerSecondaryBtn').style.opacity = '0.5';
        document.getElementById('firstPlayerSecondaryBtn').style.cursor = 'not-allowed';
        showNotification(textData[currentLanguage].firstSecondarySelected, 'success');
    } else if (currentSecondaryPlayer === 'second') {
        selectedSecondSecondaryCard = selectedCardData;
        updateSecondSecondaryDisplay(selectedCardData);
        document.getElementById('secondPlayerSecondaryBtn').disabled = true;
        document.getElementById('secondPlayerSecondaryBtn').style.opacity = '0.5';
        document.getElementById('secondPlayerSecondaryBtn').style.cursor = 'not-allowed';
        showNotification(textData[currentLanguage].secondSecondarySelected, 'success');
    }
    
    closeSecondaryMissionModal();
    
    // 두 플레이어 모두 세컨더리 미션을 선택했는지 확인
    if (selectedFirstSecondaryCard && selectedSecondSecondaryCard) {
        // 세컨더리 미션 섹션 숨기고 나머지 섹션들 표시
        showGameSections();
    }
}

// 선공 세컨더리 표시 업데이트
function updateFirstSecondaryDisplay(cardData) {
    const selectedFirstSecondaryDisplay = document.getElementById('selectedFirstSecondaryDisplay');
    selectedFirstSecondaryDisplay.innerHTML = `
        <p id="selectedFirstSecondary">${cardData.title}</p>
        <img src="data/subtask/${currentLanguage}/${cardData.image}" alt="${cardData.title}" style="width: 100%; max-width: 100px; height: auto; border-radius: 8px; margin-top: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); cursor: pointer;" onclick="showSelectedFirstSecondaryImage()">
    `;
}

// 후공 세컨더리 표시 업데이트
function updateSecondSecondaryDisplay(cardData) {
    const selectedSecondSecondaryDisplay = document.getElementById('selectedSecondSecondaryDisplay');
    selectedSecondSecondaryDisplay.innerHTML = `
        <p id="selectedSecondSecondary">${cardData.title}</p>
        <img src="data/subtask/${currentLanguage}/${cardData.image}" alt="${cardData.title}" style="width: 100%; max-width: 100px; height: auto; border-radius: 8px; margin-top: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); cursor: pointer;" onclick="showSelectedSecondSecondaryImage()">
    `;
}

// 선택된 카드 이미지 확대 보기 함수들
function showSelectedMapImage() {
    const selectedMapDisplay = document.getElementById('selectedMapDisplay');
    const img = selectedMapDisplay.querySelector('img');
    if (img) {
        const mapTitle = img.alt;
        const mapImage = img.src;
        const texts = textData[currentLanguage];
        
        // 이미지 로드 실패 처리
        const modalImg = document.getElementById('missionModalImage');
        modalImg.onerror = function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 100%;
                height: 200px;
                background: #f0f0f0;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                color: #666;
                font-size: 1rem;
                text-align: center;
                padding: 20px;
                margin: 20px 0;
            `;
            fallback.textContent = `${texts.imageLoadFailed || '이미지를 불러올 수 없습니다'}: ${mapTitle}`;
            this.parentNode.insertBefore(fallback, this.nextSibling);
        };
        
        // 모달 내용 설정
        document.getElementById('missionModalTitle').textContent = `${texts.selectedMap} ${mapTitle}`;
        modalImg.src = mapImage;
        modalImg.alt = mapTitle;
        modalImg.style.display = 'block'; // 이미지 표시 초기화
        // 맵 이미지 크기를 더 크게 설정
        modalImg.style.maxWidth = '95vw';
        modalImg.style.maxHeight = '80vh';
        modalImg.style.objectFit = 'contain';
        // 설명 숨기기
        document.getElementById('missionModalDescription').style.display = 'none';
        
        // 확인 버튼 숨기기, 닫기 버튼만 표시
        const confirmBtn = document.getElementById('missionModalConfirmBtn');
        confirmBtn.style.display = 'none';
        
        // 닫기 버튼 이벤트 설정 (이미지 확대 모달용)
        const closeBtn = document.getElementById('missionModalCloseBtn');
        closeBtn.onclick = closeImageModal;
        
        // body 스크롤 방지 (모달 표시 전에 먼저 실행)
        preventBodyScroll();
        
        // 모달 표시
        document.getElementById('missionModal').style.display = 'block';
    }
}

function showSelectedMissionImage() {
    const selectedMissionDisplay = document.getElementById('selectedMissionDisplay');
    const img = selectedMissionDisplay.querySelector('img');
    if (img) {
        const missionTitle = img.alt;
        const missionImage = img.src;
        const texts = textData[currentLanguage];
        
        // 이미지 로드 실패 처리
        const modalImg = document.getElementById('missionModalImage');
        modalImg.onerror = function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 100%;
                height: 200px;
                background: #f0f0f0;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                color: #666;
                font-size: 1rem;
                text-align: center;
                padding: 20px;
                margin: 20px 0;
            `;
            fallback.textContent = `${texts.imageLoadFailed || '이미지를 불러올 수 없습니다'}: ${missionTitle}`;
            this.parentNode.insertBefore(fallback, this.nextSibling);
        };
        
        // 모달 내용 설정
        document.getElementById('missionModalTitle').textContent = `${texts.finalMission} ${missionTitle}`;
        modalImg.src = missionImage;
        modalImg.alt = missionTitle;
        modalImg.style.display = 'block'; // 이미지 표시 초기화
        // 이미지 크기를 세컨더리와 동일하게 설정
        modalImg.style.maxWidth = '80vw';
        modalImg.style.maxHeight = '60vh';
        modalImg.style.objectFit = 'contain';
        // 설명 숨기기
        document.getElementById('missionModalDescription').style.display = 'none';
        
        // 확인 버튼 숨기기, 닫기 버튼만 표시
        const confirmBtn = document.getElementById('missionModalConfirmBtn');
        confirmBtn.style.display = 'none';
        
        // 닫기 버튼 이벤트 설정 (이미지 확대 모달용)
        const closeBtn = document.getElementById('missionModalCloseBtn');
        closeBtn.onclick = closeImageModal;
        
        // body 스크롤 방지 (모달 표시 전에 먼저 실행)
        preventBodyScroll();
        
        // 모달 표시
        document.getElementById('missionModal').style.display = 'block';
    }
}

function showSelectedFirstSecondaryImage() {
    const selectedFirstSecondaryDisplay = document.getElementById('selectedFirstSecondaryDisplay');
    const img = selectedFirstSecondaryDisplay.querySelector('img');
    if (img) {
        const secondaryTitle = img.alt;
        const secondaryImage = img.src;
        const texts = textData[currentLanguage];
        
        // 이미지 로드 실패 처리
        const modalImg = document.getElementById('missionModalImage');
        modalImg.onerror = function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 100%;
                height: 200px;
                background: #f0f0f0;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                color: #666;
                font-size: 1rem;
                text-align: center;
                padding: 20px;
                margin: 20px 0;
            `;
            fallback.textContent = `${texts.imageLoadFailed || '이미지를 불러올 수 없습니다'}: ${secondaryTitle}`;
            this.parentNode.insertBefore(fallback, this.nextSibling);
        };
        
        // 모달 내용 설정
        document.getElementById('missionModalTitle').textContent = `${texts.firstSecondary} ${secondaryTitle}`;
        modalImg.src = secondaryImage;
        modalImg.alt = secondaryTitle;
        modalImg.style.display = 'block'; // 이미지 표시 초기화
        // 이미지 크기를 더 작게 설정
        modalImg.style.maxWidth = '80vw';
        modalImg.style.maxHeight = '60vh';
        modalImg.style.objectFit = 'contain';
        // 설명 숨기기
        document.getElementById('missionModalDescription').style.display = 'none';
        
        // 확인 버튼 숨기기, 닫기 버튼만 표시
        const confirmBtn = document.getElementById('missionModalConfirmBtn');
        confirmBtn.style.display = 'none';
        
        // 닫기 버튼 이벤트 설정 (이미지 확대 모달용)
        const closeBtn = document.getElementById('missionModalCloseBtn');
        closeBtn.onclick = closeImageModal;
        
        // body 스크롤 방지 (모달 표시 전에 먼저 실행)
        preventBodyScroll();
        
        // 모달 표시
        document.getElementById('missionModal').style.display = 'block';
    }
}

function showSelectedSecondSecondaryImage() {
    const selectedSecondSecondaryDisplay = document.getElementById('selectedSecondSecondaryDisplay');
    const img = selectedSecondSecondaryDisplay.querySelector('img');
    if (img) {
        const secondaryTitle = img.alt;
        const secondaryImage = img.src;
        const texts = textData[currentLanguage];
        
        // 이미지 로드 실패 처리
        const modalImg = document.getElementById('missionModalImage');
        modalImg.onerror = function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.style.cssText = `
                width: 100%;
                height: 200px;
                background: #f0f0f0;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 8px;
                color: #666;
                font-size: 1rem;
                text-align: center;
                padding: 20px;
                margin: 20px 0;
            `;
            fallback.textContent = `${texts.imageLoadFailed || '이미지를 불러올 수 없습니다'}: ${secondaryTitle}`;
            this.parentNode.insertBefore(fallback, this.nextSibling);
        };
        
        // 모달 내용 설정
        document.getElementById('missionModalTitle').textContent = `${texts.secondSecondary} ${secondaryTitle}`;
        modalImg.src = secondaryImage;
        modalImg.alt = secondaryTitle;
        modalImg.style.display = 'block'; // 이미지 표시 초기화
        // 이미지 크기를 더 작게 설정
        modalImg.style.maxWidth = '80vw';
        modalImg.style.maxHeight = '60vh';
        modalImg.style.objectFit = 'contain';
        // 설명 숨기기
        document.getElementById('missionModalDescription').style.display = 'none';
        
        // 확인 버튼 숨기기, 닫기 버튼만 표시
        const confirmBtn = document.getElementById('missionModalConfirmBtn');
        confirmBtn.style.display = 'none';
        
        // 닫기 버튼 이벤트 설정 (이미지 확대 모달용)
        const closeBtn = document.getElementById('missionModalCloseBtn');
        closeBtn.onclick = closeImageModal;
        
        // body 스크롤 방지 (모달 표시 전에 먼저 실행)
        preventBodyScroll();
        
        // 모달 표시
        document.getElementById('missionModal').style.display = 'block';
    }
}

// 이미지 확대 모달 전용 닫기 함수
function closeImageModal() {
    if (isModalClosing) return;
    isModalClosing = true;
    
    const modal = document.getElementById('missionModal');
    modal.classList.add('closing');
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('closing');
        
        // 이미지 확대 모달 상태 초기화
        const confirmBtn = document.getElementById('missionModalConfirmBtn');
        const description = document.getElementById('missionModalDescription');
        const modalImage = document.getElementById('missionModalImage');
        
        // 확인 버튼 다시 표시
        confirmBtn.style.display = 'inline-block';
        // 설명 다시 표시
        description.style.display = 'block';
        // 이미지 스타일 초기화
        modalImage.style.maxWidth = '';
        modalImage.style.maxHeight = '';
        modalImage.style.objectFit = '';
        
        currentModalCard = null;
        isModalClosing = false;
        
        // body 스크롤 복원
        restoreBodyScroll();
    }, 300);
}

// 언어 변경 함수
function changeLanguage(language) {
    // 언어 변경 플래그 설정
    isLanguageChangeReload = true;
    localStorage.setItem('isLanguageChangeReload', 'true');
    localStorage.setItem('selectedLanguage', language);
    
    currentLanguage = language;
    
    // 모달 닫기 플래그 초기화
    isModalClosing = false;
    
    // 모든 게임 상태 초기화
    currentRound = 1;
    firstPlayerScore = 0;
    secondPlayerScore = 0;
    isPositionSwitched = false; // 전환 상태 초기화
    selectedMapCard = null;
    finalMissionCard = null;
    missionCards = [];
    remainingMissionCards = 3;
    selectedCustomMissions = [];
    isCustomMissionSelected = false;
    selectedFirstSecondaryCard = null;
    selectedSecondSecondaryCard = null;
    currentSecondaryPlayer = null;
    
    updateTexts();
    updateMapCards();
    resetSelectedCards();
    updateScoreDisplay();
    updateRoundDisplay();
    
    // 모든 섹션 숨기기
    const sectionsToHide = ['.mission-section', '.secondary-mission-section', '.selected-section', '.round-section', '.score-section'];
    sectionsToHide.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            section.style.display = 'none';
        }
    });
    
    // 맵 섹션만 표시
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
        mapSection.style.display = 'block';
    }
    
    // 다음 버튼들 숨기기
    const nextToMissionBtn = document.getElementById('nextToMissionBtn');
    const nextToSecondaryBtn = document.getElementById('nextToSecondaryBtn');
    if (nextToMissionBtn) nextToMissionBtn.style.display = 'none';
    if (nextToSecondaryBtn) nextToSecondaryBtn.style.display = 'none';
    
    // 라운드 버튼 상태 초기화
    document.getElementById('roundPlusBtn').disabled = false;
    document.getElementById('roundMinusBtn').disabled = true;
    
    // 언어 선택 UI 업데이트
    updateLanguageSelectUI();
    
    showNotification(textData[currentLanguage].languageChanged , 'success');
    
    // 페이지 즉시 새로고침
    location.reload();
}

// 언어 이름 가져오기
function getLanguageName(language) {
    const names = {
        'kr': '한국어',
        'en': 'English',
        'jp': '日本語',
        'cn': '中文'
    };
    return names[language] || language;
}

// 맵 카드 업데이트
function updateMapCards() {
    const mapCardsContainer = document.getElementById('mapCards');
    const mapData = languageData[currentLanguage].maps;
    
    mapCardsContainer.innerHTML = '';
    
    mapData.forEach((map, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card map-card';
        cardElement.setAttribute('data-map', map.name);
        cardElement.onclick = () => showMapModal(cardElement);
        cardElement.innerHTML = `
            <img src="data/map/${currentLanguage}/${map.image}" alt="${map.name}" class="card-image">
            <h3>${map.name}</h3>
        `;
        
        // 이미지 에러 처리 추가
        const img = cardElement.querySelector('img');
        handleImageError(img, map.name);
        
        mapCardsContainer.appendChild(cardElement);
    });
}

// 미션 카드 업데이트
function updateMissionCards() {}

// 세컨더리 미션 카드 업데이트
function updateSecondaryMissionCards() {}

// 선택된 카드들 초기화
function resetSelectedCards() {
    // 전환 상태 초기화
    isPositionSwitched = false;
    
    // 모든 섹션 숨기기
    const sectionsToHide = ['.mission-section', '.secondary-mission-section', '.selected-section', '.round-section', '.score-section', '.record-section'];
    sectionsToHide.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            section.style.display = 'none';
            if (selector === '.score-section') {
                section.classList.remove('show');
            }
        }
    });
    
    // 맵 섹션만 표시
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
        mapSection.style.display = 'block';
    }
    
    // 다음 버튼들 숨기기
    const nextToMissionBtn = document.getElementById('nextToMissionBtn');
    const nextToSecondaryBtn = document.getElementById('nextToSecondaryBtn');
    if (nextToMissionBtn) nextToMissionBtn.style.display = 'none';
    if (nextToSecondaryBtn) nextToSecondaryBtn.style.display = 'none';
    
    // 선택된 맵 초기화
    selectedMapCard = null;
    const selectedMapDisplay = document.getElementById('selectedMapDisplay');
    selectedMapDisplay.innerHTML = '<p id="selectedMap">Empty</p>';
    
    // 선택된 미션 초기화
    finalMissionCard = null;
    const selectedMissionDisplay = document.getElementById('selectedMissionDisplay');
    selectedMissionDisplay.innerHTML = '<p id="finalMission">Empty</p>';
    
    // 선택된 세컨더리 미션 초기화
    selectedFirstSecondaryCard = null;
    selectedSecondSecondaryCard = null;
    const selectedFirstSecondaryDisplay = document.getElementById('selectedFirstSecondaryDisplay');
    const selectedSecondSecondaryDisplay = document.getElementById('selectedSecondSecondaryDisplay');
    selectedFirstSecondaryDisplay.innerHTML = '<p id="selectedFirstSecondary">Empty</p>';
    selectedSecondSecondaryDisplay.innerHTML = '<p id="selectedSecondSecondary">Empty</p>';
    
    // 버튼들 활성화
    const customMissionBtn = document.getElementById('customMissionBtn');
    const firstPlayerSecondaryBtn = document.getElementById('firstPlayerSecondaryBtn');
    const secondPlayerSecondaryBtn = document.getElementById('secondPlayerSecondaryBtn');
    
    customMissionBtn.style.display = 'block';
    
    firstPlayerSecondaryBtn.disabled = false;
    firstPlayerSecondaryBtn.style.opacity = '1';
    firstPlayerSecondaryBtn.style.cursor = 'pointer';
    
    secondPlayerSecondaryBtn.disabled = false;
    secondPlayerSecondaryBtn.style.opacity = '1';
    secondPlayerSecondaryBtn.style.cursor = 'pointer';
    
    // 맵 카드 생성
    updateMapCards();
    
    // 맵 카드들 초기화
    const mapCards = document.querySelectorAll('.map-card');
    mapCards.forEach(card => {
        card.classList.remove('selected', 'disabled', 'removed');
        card.style.pointerEvents = 'auto';
    });
    
    // 미션 카드 재생성
    missionCards = [];
    isCustomMissionSelected = false;
    generateMissionCards();
    
    // 남은 카드 텍스트 다시 표시
    const remainingCardsLabel = document.getElementById('remainingCardsLabel');
    if (remainingCardsLabel) {
        remainingCardsLabel.style.display = 'inline';
    }
    const remainingCardsElement = document.getElementById('remainingCards');
    if (remainingCardsElement) {
        remainingCardsElement.style.display = 'inline';
    }
}

// 텍스트 업데이트 함수
function updateTexts() {
    const texts = textData[currentLanguage];
    
    // 맵 카드 선택
    const mapCardSelection = document.querySelector('.map-section h2');
    if (mapCardSelection) mapCardSelection.textContent = texts.mapCardSelection;
    
    // 맵 설명
    const mapDescription = document.querySelector('.map-info p');
    if (mapDescription) mapDescription.textContent = texts.mapDescription;
    
    // 메인 미션 카드
    const mainMissionCard = document.querySelector('.mission-section h2');
    if (mainMissionCard) mainMissionCard.textContent = texts.mainMissionCard;
    
    // 미션 설명
    const missionDescription = document.querySelector('.mission-info p:first-child');
    if (missionDescription) missionDescription.textContent = texts.missionDescription;
    
    // 남은 카드
    const remainingCards = document.getElementById('remainingCardsLabel');
    if (remainingCards) remainingCards.textContent = texts.remainingCards;
    
    // 커스텀 미션 버튼
    const customMissionBtn = document.getElementById('customMissionBtn');
    if (customMissionBtn) customMissionBtn.textContent = texts.customMissionSelection;
    
    // 세컨더리 미션 카드
    const secondaryMissionCard = document.querySelector('.secondary-mission-section h2');
    if (secondaryMissionCard) secondaryMissionCard.textContent = texts.secondaryMissionCard;
    
    // 세컨더리 미션 설명
    const secondaryMissionDescription = document.querySelector('.secondary-mission-info p');
    if (secondaryMissionDescription) secondaryMissionDescription.textContent = texts.secondaryMissionDescription;
    
    // 선공/후공 세컨더리 버튼
    const firstPlayerSecondaryBtn = document.getElementById('firstPlayerSecondaryBtn');
    const secondPlayerSecondaryBtn = document.getElementById('secondPlayerSecondaryBtn');
    if (firstPlayerSecondaryBtn) firstPlayerSecondaryBtn.textContent = texts.firstPlayerSecondary;
    if (secondPlayerSecondaryBtn) secondPlayerSecondaryBtn.textContent = texts.secondPlayerSecondary;
    
    // 선택된 카드 라벨들
    const selectedMapLabel = document.getElementById('selectedMapLabel');
    const finalMissionLabel = document.getElementById('finalMissionLabel');
    const firstSecondaryLabel = document.getElementById('firstSecondaryLabel');
    const secondSecondaryLabel = document.getElementById('secondSecondaryLabel');
    const roundLabel = document.getElementById('roundLabel');
    const firstLabel = document.getElementById('firstLabel');
    const secondLabel = document.getElementById('secondLabel');
    const resetBtn = document.getElementById('resetAllBtn');
    
    if (selectedMapLabel) selectedMapLabel.textContent = texts.selectedMap;
    if (finalMissionLabel) finalMissionLabel.textContent = texts.finalMission;
    if (firstSecondaryLabel) firstSecondaryLabel.textContent = texts.firstSecondary;
    if (secondSecondaryLabel) secondSecondaryLabel.textContent = texts.secondSecondary;
    if (roundLabel) roundLabel.textContent = texts.round;
    if (firstLabel) firstLabel.textContent = texts.first;
    if (secondLabel) secondLabel.textContent = texts.second;
    if (resetBtn) resetBtn.textContent = texts.reset;
    
    // 점수칸 언어 업데이트
    const leftPlayerLabel = document.getElementById('leftPlayerLabel');
    const rightPlayerLabel = document.getElementById('rightPlayerLabel');
    if (leftPlayerLabel) leftPlayerLabel.textContent = texts.firstLabel;
    if (rightPlayerLabel) rightPlayerLabel.textContent = texts.secondLabel;
    
    // 모달 닫기 버튼들 업데이트
    const mapModalCloseBtn = document.getElementById('mapModalCloseBtn');
    const missionModalCloseBtn = document.getElementById('missionModalCloseBtn');
    const customMissionCloseBtn = document.getElementById('customMissionCancelBtn');
    const secondaryMissionCloseBtn = document.getElementById('secondaryMissionCancelBtn');
    
    if (mapModalCloseBtn) mapModalCloseBtn.textContent = texts.close;
    if (missionModalCloseBtn) missionModalCloseBtn.textContent = texts.close;
    if (customMissionCloseBtn) customMissionCloseBtn.textContent = texts.cancel;
    if (secondaryMissionCloseBtn) secondaryMissionCloseBtn.textContent = texts.cancel;

    const resetAllBtn = document.getElementById('resetAllBtn');
    if (resetAllBtn) resetAllBtn.textContent = texts.reset;
    document.getElementById('selected-cards-title').textContent = texts.selectedCards;
    
    // 선택된 카드 설명
    const selectedCardsDescription = document.querySelector('.selected-cards-info p');
    if (selectedCardsDescription) selectedCardsDescription.textContent = texts.selectedCardsDescription;
    
    // 다음 단계 버튼들 텍스트 업데이트
    const nextToMissionBtn = document.getElementById('nextToMissionBtn');
    const nextToSecondaryBtn = document.getElementById('nextToSecondaryBtn');
    if (nextToMissionBtn) nextToMissionBtn.textContent = texts.nextStep;
    if (nextToSecondaryBtn) nextToSecondaryBtn.textContent = texts.nextStep;
    
    // 기록 버튼들 텍스트 업데이트
    const saveRecordBtn = document.getElementById('saveRecordBtn');
    const viewRecordBtn = document.getElementById('viewRecordBtn');
    if (saveRecordBtn) saveRecordBtn.textContent = texts.saveRecord;
    if (viewRecordBtn) viewRecordBtn.textContent = texts.viewRecord;
}

// 맵 선택 후 미션 카드 섹션만 표시하는 함수
function showNextSections() {
    // 맵 섹션 숨기기
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
        mapSection.style.display = 'none';
    }
    
    // 다른 섹션들 숨기기
    const selectedSection = document.querySelector('.selected-section');
    const roundSection = document.querySelector('.round-section');
    const scoreSection = document.querySelector('.score-section');
    const recordSection = document.querySelector('.record-section');
    
    if (selectedSection) selectedSection.style.display = 'none';
    if (roundSection) roundSection.style.display = 'none';
    if (scoreSection) {
        scoreSection.style.display = 'none';
        scoreSection.classList.remove('show');
    }
    // 기록 섹션은 숨기지 않음 (항상 표시)
    
    // 미션 섹션만 표시
    const missionSection = document.querySelector('.mission-section');
    if (missionSection) {
        missionSection.style.display = 'block';
        missionSection.style.animation = 'fadeIn 0.5s ease-out';
    }
}

// 메인미션 완료 후 세컨더리 미션 섹션만 표시하는 함수
function showSecondaryMissionSection() {
    // 미션 섹션 숨기기
    const missionSection = document.querySelector('.mission-section');
    if (missionSection) {
        missionSection.style.display = 'none';
    }
    
    // 다른 섹션들 숨기기
    const selectedSection = document.querySelector('.selected-section');
    const roundSection = document.querySelector('.round-section');
    const scoreSection = document.querySelector('.score-section');
    const recordSection = document.querySelector('.record-section');
    
    if (selectedSection) selectedSection.style.display = 'none';
    if (roundSection) roundSection.style.display = 'none';
    if (scoreSection) {
        scoreSection.style.display = 'none';
        scoreSection.classList.remove('show');
    }
    // 기록 섹션은 숨기지 않음 (항상 표시)
    
    // 세컨더리 미션 섹션만 표시
    const secondarySection = document.querySelector('.secondary-mission-section');
    if (secondarySection) {
        secondarySection.style.display = 'block';
        secondarySection.style.animation = 'fadeIn 0.5s ease-out';
    }
}

// 세컨더리 미션 완료 후 게임 섹션들 표시하는 함수
function showGameSections() {
    // 세컨더리 미션 섹션 숨기기
    const secondarySection = document.querySelector('.secondary-mission-section');
    if (secondarySection) {
        secondarySection.style.display = 'none';
    }
    
    // 선택된 카드 섹션 표시
    setTimeout(() => {
        const selectedSection = document.querySelector('.selected-section');
        if (selectedSection) {
            selectedSection.style.display = 'block';
            selectedSection.style.animation = 'fadeIn 0.5s ease-out';
        }
    }, 300);
    
    // 라운드 섹션 표시
    setTimeout(() => {
        const roundSection = document.querySelector('.round-section');
        if (roundSection) {
            roundSection.style.display = 'flex';
            roundSection.style.animation = 'fadeIn 0.5s ease-out';
        }
    }, 600);
    
    // 점수 섹션 표시
    setTimeout(() => {
        const scoreSection = document.querySelector('.score-section');
        if (scoreSection) {
            scoreSection.classList.add('show');
            scoreSection.style.animation = 'fadeIn 0.5s ease-out';
        }
    }, 900);
    
    // 기록 섹션 표시
    setTimeout(() => {
        const recordSection = document.querySelector('.record-section');
        if (recordSection) {
            recordSection.style.display = 'block';
            recordSection.style.animation = 'fadeIn 0.5s ease-out';
        }
        
        // 기록저장 버튼 상태 초기화
        updateSaveRecordButtonState();
    }, 1200);
}

// 기록 초기화 함수 (디버깅용)
function clearAllRecords() {
    localStorage.removeItem('gameRecords');
    console.log('모든 기록이 삭제되었습니다.');
    showNotification('모든 기록이 삭제되었습니다.', 'info');
}

// 기록 저장 함수
function saveGameRecord() {
    // 5라운드에서만 저장 가능
    if (currentRound !== 5) {
        const texts = textData[currentLanguage];
        showNotification(texts.saveOnlyAtRound5 || '5라운드에서만 기록을 저장할 수 있습니다', 'info');
        return;
    }
    
    console.log('기록저장 시작'); // 디버깅
    
    const texts = textData[currentLanguage];
    
    // 맵 카드 이름 가져오기
    let mapName = null;
    if (selectedMapCard) {
        const mapTitleElement = selectedMapCard.querySelector('h3');
        mapName = mapTitleElement ? mapTitleElement.textContent : null;
    }
    
    // 미션 카드 이름 가져오기
    let missionName = null;
    if (finalMissionCard) {
        if (typeof finalMissionCard === 'object' && finalMissionCard.name) {
            // 객체인 경우 (커스텀 미션)
            missionName = finalMissionCard.name;
        } else if (finalMissionCard.querySelector) {
            // DOM 요소인 경우
            const missionTitleElement = finalMissionCard.querySelector('h3');
            missionName = missionTitleElement ? missionTitleElement.textContent : null;
        }
    }
    
    // 세컨더리 카드 이름 가져오기
    let firstSecondaryName = null;
    let secondSecondaryName = null;
    
    if (selectedFirstSecondaryCard && typeof selectedFirstSecondaryCard === 'object') {
        firstSecondaryName = selectedFirstSecondaryCard.title;
    }
    
    if (selectedSecondSecondaryCard && typeof selectedSecondSecondaryCard === 'object') {
        secondSecondaryName = selectedSecondSecondaryCard.title;
    }
    
    // 실제 화면에 표시되는 점수 가져오기
    const leftScoreElement = document.getElementById('firstPlayerScore');
    const rightScoreElement = document.getElementById('secondPlayerScore');
    const leftLabelElement = document.getElementById('leftPlayerLabel');
    const rightLabelElement = document.getElementById('rightPlayerLabel');
    
    let actualFirstScore = firstPlayerScore;
    let actualSecondScore = secondPlayerScore;
    
    // 전환 상태를 고려하여 실제 표시되는 점수 결정
    if (isPositionSwitched) {
        // 전환된 상태: 실제 화면 표시와 동일하게 저장
        if (leftLabelElement && leftLabelElement.textContent === texts.first) {
            // 왼쪽이 선공인 경우
            actualFirstScore = parseInt(leftScoreElement.textContent) || 0;
            actualSecondScore = parseInt(rightScoreElement.textContent) || 0;
        } else {
            // 오른쪽이 선공인 경우
            actualFirstScore = parseInt(rightScoreElement.textContent) || 0;
            actualSecondScore = parseInt(leftScoreElement.textContent) || 0;
        }
    }
    
    const gameData = {
        timestamp: new Date().toISOString(),
        currentRound: currentRound,
        firstPlayerScore: actualFirstScore,
        secondPlayerScore: actualSecondScore,
        isPositionSwitched: isPositionSwitched, // 전환 상태 저장
        selectedMapCard: mapName,
        finalMissionCard: missionName,
        selectedFirstSecondaryCard: firstSecondaryName,
        selectedSecondSecondaryCard: secondSecondaryName,
        language: currentLanguage
    };
    
    console.log('저장할 데이터:', gameData); // 디버깅
    
    // localStorage에서 기존 기록 가져오기
    let existingRecords = [];
    try {
        const storedRecords = localStorage.getItem('gameRecords');
        if (storedRecords) {
            existingRecords = JSON.parse(storedRecords);
        }
    } catch (error) {
        console.error('기존 기록 로드 실패:', error);
        existingRecords = [];
    }
    
    console.log('기존 기록 수:', existingRecords.length); // 디버깅
    
    // 새 기록 추가
    existingRecords.push(gameData);
    
    // 최대 100개 기록만 유지 (제한을 늘림)
    if (existingRecords.length > 100) {
        existingRecords.splice(0, existingRecords.length - 100);
    }
    
    // localStorage에 저장
    try {
        localStorage.setItem('gameRecords', JSON.stringify(existingRecords));
        console.log('저장 완료, 총 기록 수:', existingRecords.length); // 디버깅
    } catch (error) {
        console.error('기록 저장 실패:', error);
        showNotification('기록 저장에 실패했습니다.', 'error');
        return;
    }
    
    // 성공 메시지 표시
    showNotification('게임 기록이 저장되었습니다!', 'success');
}

// 기록 보기 함수
function viewGameRecords() {
    console.log('기록보기 시작'); // 디버깅
    
    let records = [];
    try {
        const storedRecords = localStorage.getItem('gameRecords');
        if (storedRecords) {
            records = JSON.parse(storedRecords);
        }
    } catch (error) {
        console.error('기록 로드 실패:', error);
        showNotification('기록을 불러오는데 실패했습니다.', 'error');
        return;
    }
    
    console.log('현재 저장된 기록들:', records); // 디버깅
    
    if (records.length === 0) {
        showNotification('저장된 기록이 없습니다.', 'info');
        return;
    }
    
    // 기록을 시간순으로 정렬 (최신순)
    records.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    let recordsText = '';
    records.forEach((record, index) => {
        const date = new Date(record.timestamp).toLocaleString('ko-KR');
        const texts = textData[record.language] || textData['kr']; // 언어별 텍스트 가져오기
        
        recordsText += `${date}\n`;
        recordsText += `   ${texts.round}: ${record.currentRound}/5\n`;
        recordsText += `   ${texts.first}: ${record.firstPlayerScore}\n`;
        recordsText += `   ${texts.second}: ${record.secondPlayerScore}\n`;
        if (record.selectedMapCard) {
            recordsText += `   ${texts.map}: ${record.selectedMapCard}\n`;
        }
        if (record.finalMissionCard) {
            recordsText += `   ${texts.mission}: ${record.finalMissionCard}\n`;
        }
        if (record.selectedFirstSecondaryCard) {
            recordsText += `   ${texts.firstSecondary} ${record.selectedFirstSecondaryCard}\n`;
        }
        if (record.selectedSecondSecondaryCard) {
            recordsText += `   ${texts.secondSecondary} ${record.selectedSecondSecondaryCard}\n`;
        }
        
        // 마지막 기록이 아닌 경우에만 구분선 추가
        if (index < records.length - 1) {
            recordsText += '\n────────────────────────\n\n';
        } else {
            recordsText += '\n';
        }
    });
    
    console.log('표시할 기록 텍스트:', recordsText); // 디버깅
    
    // 모달로 기록 표시
    showRecordsModal(recordsText);
}

// 기록 모달 표시 함수
function showRecordsModal(recordsText) {
    const texts = textData[currentLanguage];
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <div class="modal-header">
                <h2>${texts.gameRecords}</h2>
                <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            </div>
            <div class="modal-body">
                <pre style="white-space: pre-wrap; font-family: inherit; background: #f8f9fa; padding: 15px; border-radius: 8px; max-height: 400px; overflow-y: auto;">${recordsText}</pre>
            </div>
            <div class="modal-footer">
                <button class="modal-btn cancel-btn" onclick="this.closest('.modal').remove()">${texts.close}</button>
            </div>
        </div>
    `;
    
    // body 스크롤 방지 (모달 표시 전에 먼저 실행)
    preventBodyScroll();
    
    document.body.appendChild(modal);
    
    // 모달 닫기 이벤트 리스너 추가
    const closeElements = modal.querySelectorAll('.close, .modal-btn');
    closeElements.forEach(element => {
        element.addEventListener('click', () => {
            modal.remove();
            // body 스크롤 복원
            restoreBodyScroll();
        });
    });
}

// 이미지 로드 실패 처리 함수
function handleImageError(img, fallbackText) {
    img.onerror = function() {
        this.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.style.cssText = `
            width: 100%;
            height: 100px;
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            color: #666;
            font-size: 0.8rem;
            text-align: center;
            padding: 10px;
        `;
        
        // 현재 언어에 맞는 fallback 텍스트 사용
        const errorMessages = {
            'kr': '이미지를 불러올 수 없습니다',
            'en': 'Failed to load image',
            'jp': '画像を読み込めません',
            'cn': '无法加载图像'
        };
        
        fallback.textContent = fallbackText || errorMessages[currentLanguage] || 'Image Error';
        this.parentNode.insertBefore(fallback, this);
    };
}

// 모달 스크롤 제어 함수들
function preventBodyScroll() {
    // 현재 스크롤 위치 저장 (더 정확한 방법 사용)
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // body에 modal-open 클래스 추가하여 스크롤 방지
    document.body.classList.add('modal-open');
    
    // position: fixed를 사용하지 않으므로 top 스타일 제거
    // document.body.style.top = `-${scrollPosition}px`;
}

function restoreBodyScroll() {
    // modal-open 클래스 제거
    document.body.classList.remove('modal-open');
    
    // body 스타일 초기화 (top 스타일이 없으므로 제거)
    // document.body.style.top = '';
    
    // 스크롤 위치 복원이 필요 없음 (position: fixed를 사용하지 않으므로)
    // window.scrollTo는 제거
} 