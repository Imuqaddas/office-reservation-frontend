interface SelectorProps {
  pieces?: number;
  onCreate?: (pieces: number) => Promise<void>;
  onUpdate?: (pieces: number) => Promise<void>;
  onDelete?: () => Promise<void>;
}

export default SelectorProps;
