import { CareerEntry } from '../types/portfolio';
import { MEDIA } from './media';

export const DESIGNER_PROFILE = {
  name: 'KYUNGWON YOUN',
  title: 'GARDEN DESIGNER',
  email: 'kyungwonyoun@gmail.com',
  instagram: {
    handle: '@gyeongone_garden',
    url: 'https://www.instagram.com/gyeongone_garden',
  },
  locationEn: 'Seoul, South Korea',
  locationKr: '대한민국 서울',
  portrait: {
    src: MEDIA.designerPortrait,
    alt: 'Garden designer Kyungwon Youn tending ornamental grasses in an architectural courtyard garden',
    credit: 'Garden Portrait (Sample)',
  },
  heroVisual: {
    src: MEDIA.heroCourtyard,
    alt: 'Architectural residential courtyard garden with multi-stem hornbeams and limestone paving',
    credit: 'Selected Courtyard Archive (Sample)',
  },
  philosophy: {
    headlineEn: 'Designing the relationship between people and nature.',
    headlineKr: '사람과 자연이 일상 속에서 이어지는 정원을 설계합니다.',
    leadEn:
      'A garden is not an ornament applied to the edge of architecture. It is a living spatial framework where soil, climate, plants, and human daily rhythm meet.',
    leadKr:
      '정원은 건축의 빈자리를 채우는 장식이 아니라, 흙과 기후, 식물, 그리고 사람의 일상이 만나는 살아 있는 공간입니다.',
  },
  bioEn: [
    'Kyungwon Youn is a Seoul-based garden designer working across private residences, commercial spaces, indoor and outdoor atriums, and ongoing horticultural maintenance.',
    'Through hands-on practice at the landscape studio ORANGERY, she has experienced the entire lifecycle of a garden—from initial concept proposals and planting design to construction and post-completion stewardship. Within Korea’s distinct four seasons, her work pursues planting compositions and natural materials that gain depth over time without artificial excess.',
    'This portfolio is centered on real built and managed projects rather than speculative concepts or competitions, transparently distinguishing full company project scopes from her actual individual responsibilities.',
  ],
  bioKr: [
    '윤경원은 서울을 기반으로 개인 주택, 상업 공간 등의 실내,외 아트리움, 그리고 유지관리까지 아우르는 가든 디자이너입니다.',
    '조경회사 ORANGERY에서의 실무 경험을 통해 정원 컨셉 제안부터 설계 식재 계획, 시공, 준공 후 사후 관리까지 정원의 전 과정을 경험했습니다. 한국의 뚜렷한 사계절 속에서 과도한 인위성 없이 시간이 갈수록 깊이를 더하는 식재와 물성을 지향합니다.',
    '이 포트폴리오는 가상 콘셉트나 공모전이 아닌 실제 수행 프로젝트를 중심으로 구성되며, 회사의 전체 수행 범위와 본인이 실제로 담당한 업무를 투명하게 구분하여 기록합니다.',
  ],
  career: [
    {
      period: '2025 — Present',
      roleEn: 'Independent Garden Designer (Preparing Studio Practice)',
      roleKr: '가든 디자이너 (독립 실무 및 스튜디오 준비)',
      organization: 'KYUNGWON YOUN · Seoul',
      focusEn: 'Private garden consultation, horticultural stewardship & portfolio archiving',
      focusKr: '개인 정원 설계 자문, 정원 유지관리 및 포트폴리오 아카이빙',
    },
    {
      period: '2021 — 2024',
      roleEn: 'Garden Designer & Project Lead',
      roleKr: '가든 디자이너 및 프로젝트 담당',
      organization: 'ORANGERY',
      focusEn: 'Concept proposals, residential & commercial planting design, construction & post-completion maintenance',
      focusKr: '정원 컨셉 제안, 설계·식재 계획, 시공 및 준공 후 사후 관리 전 과정 수행',
    },
    {
      period: '2019 — 2021',
      roleEn: 'Junior Landscape Designer',
      roleKr: '조경 설계 어시스턴트',
      organization: 'Botanical & Spatial Design Studio (Sample)',
      focusEn: '3D visualization, botanical research, indoor plant curation & construction documentation',
      focusKr: '3D 공간 시뮬레이션, 식생 리서치, 실내 플랜트 큐레이션 및 도면 보조',
    },
  ] as CareerEntry[],
  capabilities: [
    {
      number: '01',
      titleEn: 'Garden Design & Planting Plan',
      titleKr: '정원 설계 및 식재 계획',
      descriptionEn:
        'Masterplans, microclimate light/drainage analysis, 3D spatial studies, and seasonal perennial-shrub planting matrices.',
      descriptionKr:
        '대지 미기후·배수 분석을 바탕으로 한 기본 구상, 3D 공간 스터디, 사계절 천이를 고려한 다년초·관목 식재 계획.',
    },
    {
      number: '02',
      titleEn: 'Construction Supervision',
      titleKr: '시공 감리 및 현장 조율',
      descriptionEn:
        'Nursery specimen selection, hardscape material coordination, soil conditioning checks, and on-site planting placement.',
      descriptionKr:
        '농장 교목 선별, 석재·스틸 등 하드스케이프 디테일 검수, 식재 기반 토양 확인 및 현장 배식 감리.',
    },
    {
      number: '03',
      titleEn: 'Horticultural Maintenance',
      titleKr: '정원 유지관리',
      descriptionEn:
        'Long-term structural pruning, seasonal cutbacks, soil nutrition balancing, and living documentation over multiple years.',
      descriptionKr:
        '수목 수형 전정, 계절별 초화류 정리, 토양 영양·관수 점검 등 준공 이후의 지속 가능한 생육 관리.',
    },
  ],
  futurePracticeNote: {
    brandName: 'UNFOLD GREEN',
    noteEn:
      'This website currently serves as Kyungwon Youn’s personal portfolio. In future phases, it is structured to expand into UNFOLD GREEN—a dedicated practice offering integrated garden design, construction, and seasonal stewardship services.',
    noteKr:
      '현재 웹사이트는 디자이너 개인 포트폴리오로 운영되며, 향후 UNFOLD GREEN의 정원 설계·시공·유지관리 서비스 및 견적 상담을 담을 수 있는 확장 구조로 설계되었습니다.',
  },
};
