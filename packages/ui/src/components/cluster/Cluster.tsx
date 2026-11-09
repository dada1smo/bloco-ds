import type { ComponentProps } from 'react';
import { clusterStyles, type ClusterStyleProps } from './Cluster.styles';

export type ClusterProps = ComponentProps<'div'> & ClusterStyleProps;

/** Itens em linha que quebram quando falta espaço: tags, toolbars, grupos de botões (padrão `gap-3`). */
export function Cluster({ gap, className, ...props }: ClusterProps) {
  return <div {...props} className={clusterStyles({ gap, className })} />;
}
