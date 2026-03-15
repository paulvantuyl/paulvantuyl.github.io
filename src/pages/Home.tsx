import { Layout } from '../components/Layout';
import { Text } from '../components/Text';
import { Icon } from '../components/Icon';

const sidebarContent = (
    <Text variant="h5" className="post-tags">Research&amp;<br />Pixels&amp;<br />Protypes&amp;<br />Code</Text>
);

const subTitle = "Developer/designer working on B2B, B2C and enterprise products.";

export function Home() {
    return (
        <Layout title="Hello, World" subtitle={subTitle} variant="sidebar" sidebarContent={sidebarContent}>
            <Text variant="p">Hi, I'm Paul Van Tuyl (<span aria-label="Van Tile" lang="en-fonipa">/v&aelig;n ta&#618;l/</span>). Professionally I spend my time in a hybrid role with the primary focus on product design, and the secondary focus on development. I'm looking to switch that up.</Text>

            <h2>Résumé</h2>

            <p>I've been working as a designer or developer (primarily frontend) full time since 2006. While my education was in graphic design, my professional focus has been centered around digital products. I started making things for the web while in school, and come from the era where you had to be able to both design and develop your work.</p>

            <Text variant="h3">Thryv</Text>
            <Text variant="p">Principal Product Designer<br />
                Dallas, TX (Remote)<br />
                July 2018 &ndash; Present</Text>
            <Text variant="p">As a Principal Product Designer at <a href="https://www.thryv.com/">Thryv</a>, I fill a hybrid role of designer and developer. My biggest focus is helping to architect a design system that's multi-framework, multi-brand, and multi-theme.</Text>
            <Text variant="p">Originally, I started at Infusionsoft in 2018, which later rebranded as Keap. In late 2024, Keap was acquired by Thryv.</Text>  

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
