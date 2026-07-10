import { useState } from 'react';
import { User } from 'lucide-react';
import type { Advisor } from '@shared/advisors';
import { cn } from '../../lib/utils';

interface Props {
  advisor: Advisor;
  className?: string;
  iconClassName?: string;
}

export function AdvisorAvatar({ advisor, className, iconClassName }: Props) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div className={cn('flex-shrink-0 overflow-hidden rounded-full bg-neutral-100', className)}>
      {imgFailed ? (
        <div className="flex h-full w-full items-center justify-center">
          <User className={cn('text-neutral-400', iconClassName)} />
        </div>
      ) : (
        <img
          src={advisor.imageUrl}
          alt={advisor.name}
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
        />
      )}
    </div>
  );
}
