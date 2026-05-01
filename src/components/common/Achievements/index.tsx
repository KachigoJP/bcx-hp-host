import React from 'react';
import styles from './Achievements.module.scss';

export interface AchievementItem {
    number: string;
    label: string;
    icon: string;
}

export interface AchievementsProps {
    title: string;
    subtitle: string;
    description: string;
    achievements: AchievementItem[];
}

const Achievements: React.FC<AchievementsProps> = ({ title, subtitle, description, achievements }) => {
    return (
        <section className={`${styles['wpo-achievements-section']} section-padding`}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="wpo-section-title text-center">
                            <span>{subtitle}</span>
                            <h2>{title}</h2>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {achievements.map((achievement, index) => (
                        <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-12">
                            <div className={styles['wpo-achievement-item']}>
                                <div className={styles['wpo-achievement-icon']}>
                                    <i className={achievement.icon}></i>
                                </div>
                                <div className={styles['wpo-achievement-content']}>
                                    <h3 className="counter">{achievement.number}</h3>
                                    <p>{achievement.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
