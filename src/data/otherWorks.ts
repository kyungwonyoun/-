import { OtherWork } from '../types/portfolio';
import { MEDIA } from './media';

export const OTHER_WORKS: OtherWork[] = [
  {
    id: 'ow-01',
    indexNumber: '01',
    titleEn: 'Winter Branch & Stoneware Study',
    titleKr: '겨울 가지와 도자 조형 스타일링',
    category: 'Indoor Styling',
    year: '2024',
    clientOrVenue: 'Private Gallery Residence, Hannam-dong',
    summaryEn:
      'Minimalist seasonal botanical styling pairing pruned dormant branches with raw travertine and Korean stoneware.',
    summaryKr: '전정 후 남는 겨울 나뭇가지의 선과 거친 트래버틴, 옹기 도자를 결합한 실내 보태니컬 스타일링.',
    detailsEn: [
      'Rather than importing cut tropical flowers, this indoor study celebrates architectural line and shadow using dormant branches salvaged from winter garden pruning.',
      'Positioned beside a north-facing steel window, the hand-thrown stoneware vessel anchors a quiet dialogue between interior stone finishes and the exterior courtyard.',
    ],
    detailsKr: [
      '절화 위주의 일회성 꽃꽂이 대신 정원 겨울 전정 과정에서 얻은 가지의 조형미를 실내로 들였습니다.',
      '북향 창가의 자연광이 만드는 그림자를 통해 내부 석재 마감과 외부 정원 사이의 조용한 연결을 의도했습니다.',
    ],
    image: {
      id: 'ow-01-img',
      src: MEDIA.otherEditorial,
      alt: 'Ceramic vessel with sculptural winter branches on travertine plinth by architectural window',
      captionEn: 'Sculptural winter branches in stoneware on raw travertine plinth.',
      captionKr: '트래버틴 좌대 위의 도자 화기와 겨울 가지 오브제.',
      credit: 'Kyungwon Youn',
      aspectRatio: '3/4',
    },
    credits: 'Styling & Photography: Kyungwon Youn',
  },
  {
    id: 'ow-02',
    indexNumber: '02',
    titleEn: 'Living Threshold — Pop-up Botanical Installation',
    titleKr: '살아 있는 경계 — 공간 디렉팅 전시',
    category: 'Spatial Curation',
    year: '2023',
    clientOrVenue: 'Design Showroom Pop-up, Seongsu-dong',
    summaryEn:
      'Temporary moss, basalt, and shade-fern installation integrated inside a minimalist furniture showroom.',
    summaryKr: '미니멀 가구 쇼룸 내부에 이끼와 현무암, 음지 양치식물을 한시적으로 구현한 공간 큐레이션.',
    detailsEn: [
      'Curated for a 14-day architectural furniture exhibition, the installation introduced living forest-floor modules without permanent floor alteration.',
      'All plant specimens were potted in breathable root pouches concealed beneath volcanic gravel and returned to nursery beds after the exhibition closed.',
    ],
    detailsKr: [
      '2주간 열린 가구 전시에 맞춰 건물 바닥을 훼손하지 않으면서도 살아 있는 숲의 바닥을 쇼룸 안으로 옮겨 놓았습니다.',
      '전시에 사용된 모든 식물은 화산석 자갈 아래 통기성 루트백에 식재해 전시 종료 후 농장으로 안전하게 회수·식재했습니다.',
    ],
    image: {
      id: 'ow-02-img',
      src: MEDIA.gangnamAtrium,
      alt: 'Indoor botanical installation inside clean concrete architectural space',
      captionEn: 'Skylit indoor plant curation integrated with architectural stone beds.',
      captionKr: '건축적 석재 마감과 어우러진 실내 식재 연출 전경.',
      credit: 'Exhibition Record (Sample)',
      aspectRatio: '4/3',
    },
    credits: 'Spatial Botanical Direction: Kyungwon Youn',
  },
  {
    id: 'ow-03',
    indexNumber: '03',
    titleEn: 'Designing for Shade: Notes on Urban Courtyards',
    titleKr: '기고문: 도심의 그늘을 위한 정원 설계 노트',
    category: 'Publications',
    year: '2024',
    clientOrVenue: 'Monthly Architecture & Garden Journal (Sample Feature)',
    summaryEn:
      'Editorial essay examining soil drainage, foliage contrast, and realistic plant selection for dense Seoul courtyards.',
    summaryKr: '일조량이 부족한 서울의 좁은 중정에서 배수, 잎의 질감 대비, 현실적인 수종 선택을 다룬 연재 칼럼.',
    detailsEn: [
      'Dense urban residential plots in Seoul frequently receive less than two hours of direct sun. Forcing sun-loving flowering plants into these conditions leads to rapid decline.',
      'This essay outlines practical strategies for embracing shade—pairing textured foliage (Epimedium, Asarum, native ferns) with moisture-retentive gravel and porous stone.',
    ],
    detailsKr: [
      '도심 단독주택의 중정은 주변 건물로 인해 직사광선 시간이 하루 2시간 미만인 경우가 많습니다. 양지성 초화를 무리하게 심기보다 그늘의 미학을 받아들이는 접근이 필요합니다.',
      '이 글에서는 삼지구엽초, 족도리풀, 자생 고사리류의 잎 질감 대비와 배수성 있는 사질토·자갈 멀칭 전략을 사례와 함께 정리했습니다.',
    ],
    image: {
      id: 'ow-03-img',
      src: MEDIA.seongbukResidence,
      alt: 'Shaded residential courtyard with ferns, moss, and basalt stepping stones',
      captionEn: 'Case study photograph accompanying the urban shade essay.',
      captionKr: '칼럼에 수록된 도심 북향 중정 식재 사례.',
      credit: 'Journal Feature Archive (Sample)',
      aspectRatio: '4/3',
    },
    credits: 'Text & Case Photography: Kyungwon Youn',
  },
  {
    id: 'ow-04',
    indexNumber: '04',
    titleEn: 'Beyond Completion: Why Gardens Need Stewardship',
    titleKr: '기고문: 준공 이후의 정원, 유지관리의 시선',
    category: 'Publications',
    year: '2023',
    clientOrVenue: 'Quarterly Landscape Monograph (Sample Essay)',
    summaryEn:
      'Field reflections on how seasonal pruning, soil observation, and restrained editing shape a garden over years.',
    summaryKr: '준공 시점의 완성이 아닌, 수년간의 전정과 토양 관찰을 통해 성숙해지는 정원의 시간에 관한 기록.',
    detailsEn: [
      'Unlike static architectural concrete, a garden reaches its intended spatial maturity three to five years after planting—provided someone listens to how plants compete and adapt.',
      'Drawing from rooftop and residential maintenance logs, this article argues for treating horticultural stewardship as an integral part of design authorship.',
    ],
    detailsKr: [
      '건축물과 달리 정원은 식재 직후가 아니라 3~5년의 시간이 흐른 뒤 비로소 설계자가 의도한 공간적 밀도에 도달합니다.',
      '옥상 및 주택 정원 유지관리 기록을 바탕으로, 사후 관리가 단순한 청소가 아니라 설계의 연장선임을 이야기합니다.',
    ],
    image: {
      id: 'ow-04-img',
      src: MEDIA.plantingBlueprint,
      alt: 'Hand-tinted architectural planting diagram used to track seasonal plant succession',
      captionEn: 'Annotated planting diagram used for multi-year stewardship tracking.',
      captionKr: '다년간의 생육 변화를 추적하기 위한 식재 다이어그램.',
      credit: 'Kyungwon Youn',
      aspectRatio: '4/3',
    },
    credits: 'Author: Kyungwon Youn',
  },
];
