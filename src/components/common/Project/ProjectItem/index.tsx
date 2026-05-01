import { ImagePresets, OptimizedImage } from '@utils/imageUtils';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface ProjectItemProps {
    image: string | StaticImageData;
    slug: string;
    title: string;
    description: string;
    onClick: () => void
}

const ProjectItem: React.FC<ProjectItemProps> = ({ image, title, description, slug, onClick }) => (
    <div className="grid">
        <div className="img-holder">
            <OptimizedImage
                src={image}
                alt={title}
                {...ImagePresets.project}
            />
            <div className="hover-content">
                <Link onClick={onClick} className="plus" href="/project/[slug]" as={`/project/${slug}`}><i className="ti-plus"></i></Link>
                <h4><Link onClick={onClick} href="/project/[slug]" as={`/project/${slug}`}>{title}</Link></h4>
                <p>{description}</p>
            </div>
        </div>
    </div>
);

export default ProjectItem