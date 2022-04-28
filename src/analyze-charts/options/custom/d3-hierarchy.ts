import * as d3 from 'd3-hierarchy';
import {CustomSeriesOption, EChartsOption} from 'echarts';
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
  CustomSeriesRenderItemReturn,
} from 'echarts/types/dist/echarts';
import {dataset} from '../dataset';
import {darken} from '@mui/material';

export interface D3HierarchyItem {
  id: string;
  value: number;
  depth: number;
  index: number;
  parentId: string
}

export interface D3Hierarchy {
  series: CustomSeriesOption;
  visualMap: EChartsOption['visualMap'];
  hoverLayerThreshold: number;
}


export function d3Hierarchy(seriesData: D3HierarchyItem[], maxDepth: number): D3Hierarchy {
  let displayRoot = stratify();

  function stratify() {
    return d3
      .stratify<D3HierarchyItem>()
      .parentId(function (d) {
        return d.parentId
      })(seriesData)
      .sum(function (d) {
        return d.value || 0;
      })
      .sort(function (a, b) {
        return b.value - a.value;
      });
  }

  function overallLayout(params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI) {
    const context = params.context;

    context.nodes = {}
    d3
      .pack()
      .size([api.getWidth() - 32, api.getHeight() - 32])
      .padding(8)(displayRoot);
    displayRoot.descendants().forEach(function (node, index) {
      context.nodes[node.id] = node;
    });
  }

  function renderItem(params: CustomSeriesRenderItemParams, api: CustomSeriesRenderItemAPI): CustomSeriesRenderItemReturn {
    const context = params.context;
    // Only do that layout once in each time `setOption` called.
    if (!context.layout) {
      context.layout = true;
      overallLayout(params, api);
    }
    const nodePath = api.value('id') as string;
    const node = context.nodes[nodePath];
    if (!node) {
      // Reder nothing.
      return;
    }
    const isLeaf = !node.children || !node.children.length;
    const focus = new Uint32Array(
      node.descendants().map(function (node) {
        return node.data.index;
      }),
    );
    const nodeName = isLeaf
      ? nodePath
        .slice(nodePath.lastIndexOf('.') + 1)
        .split(/(?=[A-Z][^A-Z])/g)
        .join('\n')
      : '';
    const z2 = (api.value('depth') as number) * 2;
    if (node.id === 'root') {
      return undefined
    }
    return {
      type: 'circle',
      focus: focus,
      shape: {
        cx: node.x,
        cy: node.y + 16,
        r: node.r,
      },
      transition: ['shape'],
      z2: z2,
      textContent: {
        type: 'text',
        style: {
          // transition: isLeaf ? 'fontSize' : null,
          text: nodeName,
          fontFamily: 'Arial',
          width: node.r * 1.3,
          overflow: 'truncate',
          fontSize: node.r / 3,
        },
        emphasis: {
          style: {
            overflow: null,
            fontSize: Math.max(node.r / 3, 12),
          },
        },
      },
      textConfig: {
        position: 'inside',
      },
      style: {
        fill: api.visual('color'),
      },
      emphasis: {
        style: {
          fontFamily: 'Arial',
          fontSize: 12,
          shadowBlur: 20,
          shadowOffsetX: 3,
          shadowOffsetY: 5,
          shadowColor: 'rgba(0,0,0,0.3)',
        },
      },
    };
  }

  return {
    series: {
      type: 'custom',
      renderItem: renderItem,
      progressive: 0,
      coordinateSystem: 'none',
      encode: {
        tooltip: 'value',
        itemName: 'id',
      },
    },
    hoverLayerThreshold: Infinity,
    visualMap: [
      {
        show: false,
        min: 0,
        max: maxDepth,
        dimension: 'depth' as unknown as number,
        inRange: {
          color: [darken('#dd6b66', .3), darken('#dd6b66', .3)],
        },
      },
    ],
  };
}