import { Github, Linkedin, Twitter } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
}

interface Team1Props {
    heading?: string;
    subheading?: string;
    description?: string;
    members?: TeamMember[];
}

const Team = ({
    heading = 'Team',
    description = 'Our diverse team of experts brings together decades of experience in design, engineering, and product development.',
    members = [
        {
            id: 'member-1',
            name: 'Ashraful Islam Asrf',
            role: 'CEO & Founder',
            avatar: 'https://files.catbox.moe/qp0xyf.jpg',
            github: '#',
            twitter: '#',
            linkedin: '#',
        },
        {
            id: 'member-2',
            name: 'Ratul Hasan Ruhan',
            role: 'CTO & Co-Founder',
            avatar: 'https://media.licdn.com/dms/image/v2/D5603AQFqpP1gYP0_iQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1725054267522?e=2147483647&v=beta&t=MdNdp3Ocbbge_Q2FSASS1JhC_REp_rWDnlqRENdZoT0',
            github: '#',
            twitter: '#',
            linkedin: '#',
        },
        {
            id: 'member-3',
            name: 'Saiful Islam Rain',
            role: 'Lead Developer',
            avatar: 'https://files.catbox.moe/4m0db5.jpg',
            github: '#',
            twitter: '#',
            linkedin: '#',
        },
    ],
}: Team1Props) => {
    return (
        <section className='py-24 lg:py-32'>
            <div className='container mx-auto px-4'>
                <div className='mb-16 text-center'>
                    <h2 className='mb-6 text-3xl font-bold tracking-tight lg:text-5xl'>
                        {heading}
                    </h2>
                    <p className='text-muted-foreground mx-auto max-w-2xl text-lg leading-relaxed'>
                        {description}
                    </p>
                </div>

                <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className='p-10 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
                        >
                            <div className='flex flex-col items-center text-center'>
                                <div className='mb-4'>
                                    <Avatar className='size-20 lg:size-24'>
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback className='text-lg font-semibold'>
                                            {member.name}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                <div className='mb-6'>
                                    <h3 className='mb-1 text-lg font-semibold'>
                                        {member.name}
                                    </h3>
                                    <p className='text-primary text-sm font-medium'>
                                        {member.role}
                                    </p>
                                </div>

                                <div className='flex gap-3'>
                                    {member.github && (
                                        <a
                                            href={member.github}
                                            className='bg-muted/50 rounded-lg p-2'
                                        >
                                            <Github className='text-muted-foreground size-4' />
                                        </a>
                                    )}
                                    {member.twitter && (
                                        <a
                                            href={member.twitter}
                                            className='bg-muted/50 rounded-lg p-2'
                                        >
                                            <Twitter className='text-muted-foreground size-4' />
                                        </a>
                                    )}
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            className='bg-muted/50 rounded-lg p-2'
                                        >
                                            <Linkedin className='text-muted-foreground size-4' />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Team };
