import ProjectItem from '@components/common/Project/ProjectItem';
import { StaticImageData } from 'next/image';
import React from 'react';

export interface ProjectItem {
    image: string | StaticImageData;
    slug: string;
    title: string;
    description: string;

}
export interface ProjectProps {
    items: ProjectItem[];
}

const ProjectSection: React.FC<ProjectProps> = (props) => {
    const clickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <section className='wpo-project-section section-padding'>
            <div className="container-fluid">
                <div className="sortable-gallery">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="project-grids gallery-container clearfix">
                                {props.items.slice(0, 6).map((item, idx) => (
                                    <ProjectItem key={idx} {...item} onClick={clickHandler} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProjectSection;
