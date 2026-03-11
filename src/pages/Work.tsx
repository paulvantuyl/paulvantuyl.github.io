import { Layout } from '../components/Layout';
import { Text } from '../components/Text';

export function Work() {
    return (
        <Layout title="Work">
            <Text variant="p" className="lead">I'm a <s>designer</s> developer who thinks enterprise software can be interesting.</Text>
            <p>Consumer products aren't always the most interesting projects. Sometimes, the most impact you can make for people is with the tools they use every day at work. Enterprise level software shouldn't suck.</p>
            <h4>Design experience</h4>
            <p>A lot of my work is under NDA. These companies speak about the work I've done.</p>
            <span className="three-em-dash"></span>
            <p>
                <a href="https://keap.com/features/client-management" className="thumbnail">
                    <img className="img-responsive" src="/assets/2021/keap-logo-green.jpg" alt="Keap logo" width="250" />
                </a>
                    At Keap, I've worked on several key areas:
            </p>
            <ul>
                <li>Sales and ecommerce solutions for small businesses</li>
                <li>Designing and improving contact management for our CRM that meets the needs of small businesses, helping them reference the right information and take action</li>
                <li>Design system components, implementation, and scale</li>
            </ul>
            <span className="three-em-dash"></span>
            <p>
                <a href="https://tallwave.com" className="thumbnail">
                    <img className="img-responsive" src="/assets/2021/tallwave-logo.jpg" alt="Tallwave logo" width="250" />
                </a>
                    While working at Tallwave, I worked on a range of products as the team lead for product design:
            </p>
            <ul>
                <li>Custom CRM and enterprise tools in the fintech sector</li>
                <li>Design management tools for medical industries</li>
                <li>Tools for higher education</li>
                <li>Kickstarting UI guides and design systems across various industries</li>
            </ul>
        </Layout>
    )
}
