import styled, { css, RuleSet } from 'styled-components';

// 定义视口大小
export const phoneSize = '750px';
export const padSize = '1280px';
export const PcSize = '1920px';

// 定义模板大小函数类型
type TemplateSizeFunction = (
  property: string,
  px1: string,
  px2: string,
  px3: string
) => RuleSet<object>;

// 创建 templateSize 函数
const templateSize: TemplateSizeFunction = (property, px1, px2, px3) => css`
  @media (max-width: ${phoneSize}) {
    ${property}: ${px1};
  }

  @media (min-width: ${phoneSize}) and (max-width: ${padSize}) {
    ${property}: ${px2};
  }

  @media (min-width: ${padSize}) {
    ${property}: ${px3};
  }
`;

// 创建不同的属性函数
export const $width = (px1: string, px2: string, px3: string) =>
  templateSize('width', px1, px2, px3);
export const $height = (px1: string, px2: string, px3: string) =>
  templateSize('height', px1, px2, px3);
export const $fontSize = (px1: string, px2: string, px3: string) =>
  templateSize('font-size', px1, px2, px3);
export const $paddingTop = (px1: string, px2: string, px3: string) =>
  templateSize('padding-top', px1, px2, px3);
export const $paddingRight = (px1: string, px2: string, px3: string) =>
  templateSize('padding-right', px1, px2, px3);
export const $paddingBottom = (px1: string, px2: string, px3: string) =>
  templateSize('padding-bottom', px1, px2, px3);
export const $paddingLeft = (px1: string, px2: string, px3: string) =>
  templateSize('padding-left', px1, px2, px3);
export const $marginTop = (px1: string, px2: string, px3: string) =>
  templateSize('margin-top', px1, px2, px3);
export const $marginRight = (px1: string, px2: string, px3: string) =>
  templateSize('margin-right', px1, px2, px3);
export const $marginBottom = (px1: string, px2: string, px3: string) =>
  templateSize('margin-bottom', px1, px2, px3);
export const $marginLeft = (px1: string, px2: string, px3: string) =>
  templateSize('margin-left', px1, px2, px3);
export const $borderRadius = (px1: string, px2: string, px3: string) =>
  templateSize('border-radius', px1, px2, px3);
export const $top = (px1: string, px2: string, px3: string) => templateSize('top', px1, px2, px3);
export const $right = (px1: string, px2: string, px3: string) =>
  templateSize('right', px1, px2, px3);
export const $bottom = (px1: string, px2: string, px3: string) =>
  templateSize('bottom', px1, px2, px3);
export const $left = (px1: string, px2: string, px3: string) => templateSize('left', px1, px2, px3);

export const $paddingX = (px1: string, px2: string, px3: string) => css`
  ${templateSize('padding-left', px1, px2, px3)}
  ${templateSize('padding-right', px1, px2, px3)}
`;

export const $paddingY = (px1: string, px2: string, px3: string) => css`
  ${templateSize('padding-top', px1, px2, px3)}
  ${templateSize('padding-bottom', px1, px2, px3)}
`;

export const $marginX = (px1: string, px2: string, px3: string) => css`
  ${templateSize('margin-left', px1, px2, px3)}
  ${templateSize('margin-right', px1, px2, px3)}
`;

export const $marginY = (px1: string, px2: string, px3: string) => css`
  ${templateSize('margin-top', px1, px2, px3)}
  ${templateSize('margin-bottom', px1, px2, px3)}
`;
