import React from 'react';

type SvgElementProps = React.SVGProps<SVGSVGElement> & {
  height?: number | string;
  width?: number | string;
};

function Svg({ children, height = 24, width = 24, ...props }: SvgElementProps) {
  return (
    <svg
      height={height}
      width={width}
      viewBox={props.viewBox ?? '0 0 24 24'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}

export function Path(props: React.SVGProps<SVGPathElement>) {
  return <path {...props} />;
}

export function G({
  children,
  ...props
}: React.SVGProps<SVGGElement> & { children?: React.ReactNode }) {
  return <g {...props}>{children}</g>;
}

export function Circle(props: React.SVGProps<SVGCircleElement>) {
  return <circle {...props} />;
}

export function Rect(props: React.SVGProps<SVGRectElement>) {
  return <rect {...props} />;
}

export function Defs({ children }: { children?: React.ReactNode }) {
  return <defs>{children}</defs>;
}

export function ClipPath({
  children,
  ...props
}: React.SVGProps<SVGClipPathElement> & { children?: React.ReactNode }) {
  return <clipPath {...props}>{children}</clipPath>;
}

export type SvgProps = SvgElementProps;
export default Svg;
