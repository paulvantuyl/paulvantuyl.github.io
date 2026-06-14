import { Layout } from '../components';
import { Text } from '../components';
import { Icon } from '../components';
import { TagList } from '../components';

const sidebarContent = (
    <TagList 
        tags={[
            { value: "Research" },
            { value: "Pixels" },
            { value: "Prototypes" },
            { value: "Code" },
        ]}
        variant="h5"
    />
);

const subTitle = "Software Engineer with a background in product design.";

export function Home() {
    return (
        <Layout title="Hello, World" subtitle={subTitle} variant="sidebar" sidebarContent={sidebarContent}>

            <h2>Résumé</h2>

            <Text variant="p">Hi, I'm Paul Van Tuyl (<span aria-label="Van Tile" lang="en-fonipa">/v&aelig;n ta&#618;l/</span>). I'm a software engineer with a 20 year creative career behind me.</Text>

            <Text variant="h3">Thryv</Text>

            <Text variant="p">Sr. Software &amp; Product Engineer<br />
                Dallas, TX (Remote)<br />
                July 2018 &ndash; Present</Text>

            <Text variant="p">As a Sr. Software &amp; Product Engineer at <a href="https://www.thryv.com/">Thryv</a>, I work with our shared services teams providing tooling for other teams to use or platform products leveraged multiple features or other products. One of my favorite focus areas is the Thryv's design system, DEX (Design and Engineering Experience).</Text>

            <Text variant="p">Originally, I started at Infusionsoft in 2018, which later rebranded as <a href="https://get.keap.com/do5da5ak3eui">Keap</a>. In late 2024, Keap was acquired by <a href="https://www.thryv.com/">Thryv</a>.<br />
                <small>Other positions held: Principal Product Designer</small></Text>  

            <Text variant="h3">Tallwave</Text>

            <Text variant="p">Design Team Lead<br />
                Scottsdale, AZ<br />
                January, 2015 &ndash; July, 2018</Text>

            <Text variant="p">As a Design Team Lead at <a href="https://tallwave.com/">Tallwave</a>, I helped guide efforts to implement design thinking as we created business solutions and opportunities &ndash; through well-crafted experiences, products, and services &ndash; for Tallwave's clients. I worked directly with clients to help define strategy and requirements for projects and direct team members how to execute against specific business outcomes effectively and efficiently.</Text>

            <Text variant="p">Within the Design Team at Tallwave, my role extended into several areas. Repeatable and effective design process was important at Tallwave, so I worked on ways that we could improve our workflows, methods, and production pipelines. Design Team Leads were also responsible for reviewing work and providing feedback, mentoring team members, scoping projects, and trying to unlock creative potential.<br />
                <small>Other positions held: Emotional Design Lead, Sr. Product Designer</small></Text>

            <Text variant="h3">29th Drive</Text>

            <Text variant="p">Sr. Product Designer<br />
                Scottsdale, AZ<br />
                September, 2013 &ndash; December, 2014</Text>

            <Text variant="p">At 29th Drive, we primarily worked as a boutique UX Design firm. Team members had to be cross-disciplinary; my responsibilities included UX Design, UI Design, Front End Development, Brand Design, and Email Design.<br />
                <small>Other positions held: Product Designer &amp; Front End Developer</small></Text>

            <Text variant="h3">Education &amp; Certifications</Text>

            <Text variant="p"><strong>IBM Full-Stack JavaScript Developer</strong><br />
                <a href="https://coursera.org/share/7e14260df572e33398679f7f5ce42a77">IBM via Coursera</a><br />
                February, 2026</Text>
            
            <Text variant="p"><strong>Associate of Applied Science in Graphic Design</strong><br />
                Yavapai College<br />
                May, 2006<br />
                Graduated with honors <Icon name="laugh-beam" className="inline"></Icon></Text>
        </Layout>
    )
}
