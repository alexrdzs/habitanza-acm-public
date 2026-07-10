import { useState } from 'react';
import { User } from 'lucide-react';
import { cn } from '../../lib/utils';

// Structural, not imported from shared/advisors -- this renders both the
// small CTA advisor pool and the broader shared/team.ts roster, which only
// have name/imageUrl in common.
interface AvatarSubject {
  name: string;
  imageUrl: string;
}

interface Props {
  advisor: AvatarSubject;
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
