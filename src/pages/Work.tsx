import { Layout } from '../components/Layout'
import { Text } from '../components/Text'

const subTitle = 'Professional work & personal projects.'

export function Work() {
  return (
    <Layout title="Work" subtitle={subTitle}>
      <div className="flex flex-row flex-wrap md:flex-nowrap gap-6">
        <div className="basis-full md:basis-1/2">
          <Text variant="h1">Open source</Text>

          <Text variant="p">Projects I've contributed to.</Text>
        </div>
      </div>

      <div className="flex flex-row flex-wrap md:flex-nowrap gap-6">
        <div className="basis-full md:basis-1/2">
          <div className="content-item">
            <Text variant="h3">Calculinux</Text>

            <Text variant="p">
              <a href="https://calculinux.org">Calculinux</a> is a custom Linux
              distribution for the{' '}
              <a href="https://clockworkpi.com/products/picocalc">
                ClockworkPi Picocalc
              </a>{' '}
              device. Check out the{' '}
              <a href="https://github.com/Calculinux/meta-calculinux">repo</a>{' '}
              or join the{' '}
              <a href="https://discord.gg/KGFuybgsQ6">Discord Server</a>.
            </Text>
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-wrap md:flex-nowrap gap-6">
        <div className="basis-full md:basis-1/2">
          <Text variant="h1">Personal projects</Text>

          <Text variant="p">
            Various things I've made for fun or as part of continuous learning.
          </Text>
        </div>
      </div>

      <div className="flex flex-row flex-wrap md:flex-nowrap gap-6">
        <div className="basis-full md:basis-1/2">
          <div className="content-item">
            <Text variant="h3">Interest calculator</Text>

            <Text variant="p">
              Simple interest calculator I made as a{' '}
              <a href="https://coursera.org/share/7e14260df572e33398679f7f5ce42a77">
                school project
              </a>
              .<br />
              <a href="http://pvt.engineer/interest-calculator/">
                The calculator
              </a>{' '}
              //{' '}
              <a href="https://github.com/paulvantuyl/interest-calculator">
                Source code
              </a>
            </Text>
          </div>
        </div>

        <div className="basis-full md:basis-1/2">
          <div className="content-item">
            <Text variant="h3">Budgeting app</Text>

            <Text variant="p">
              Budgeting app I worked on as part of a{' '}
              <a href="https://coursera.org/share/7e14260df572e33398679f7f5ce42a77">
                school project
              </a>
              . The project started students with a partially complete
              applicaiton which students had to complete.
              <br />
              <a href="http://pvt.engineer/ejtos-react_budget_app/">
                The budgeting app
              </a>{' '}
              //{' '}
              <a href="https://github.com/paulvantuyl/ejtos-react_budget_app">
                Source code
              </a>
            </Text>
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-wrap md:flex-nowrap gap-6">
        <div className="basis-full md:basis-1/2">
          <Text variant="h1">Design</Text>

          <Text variant="p">
            I no longer take on design work, but this showcases my experience in
            the software industry.
          </Text>
        </div>
      </div>

      <div className="flex flex-row flex-wrap md:flex-nowrap gap-6">
        <div className="basis-full md:basis-1/2">
          <div className="content-item">
            <Text variant="h3">Keap</Text>

            <Text variant="p">
              At <a href="https://keap.com/features/client-management">Keap</a>,
              I worked on several key areas as a Product Designer:
            </Text>

            <Text variant="ul">
              <Text variant="li">
                Sales and ecommerce solutions for small businesses
              </Text>
              <Text variant="li">
                Designing and improving contact management for our CRM that
                meets the needs of small businesses, helping them reference the
                right information and take action
              </Text>
              <Text variant="li">
                Design system components, implementation, and scale
              </Text>
            </Text>
          </div>
        </div>

        <div className="basis-full md:basis-1/2">
          <div className="content-item">
            <Text variant="h3">Tallwave</Text>

            <Text variant="p">
              While working at <a href="https://tallwave.com">Tallwave</a>, I
              worked on a range of products as the team lead for product design:
            </Text>

            <Text variant="ul">
              <Text variant="li">
                Custom CRM and enterprise tools in the fintech sector
              </Text>
              <Text variant="li">
                Design management tools for medical industries
              </Text>
              <Text variant="li">Tools for higher education</Text>
              <Text variant="li">
                Kickstarting UI guides and design systems across various
                industries
              </Text>
            </Text>
          </div>
        </div>
      </div>
    </Layout>
  )
}
