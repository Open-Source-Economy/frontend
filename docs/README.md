# `.ose.yml` — Open Source Project Funding and Services Configuration

Add a `.ose.yml` file to the root of your repository to declare who maintains the project, who supports it, what paid services are available, and how revenue is distributed.

This file is **platform-agnostic**. It can be consumed by any funding platform (Open Source Economy, Open Collective, Tidelift, etc.).

## Quick Start

1. Copy the [`.ose.yml`](./service_providers.yml) template to the root of your repository.
2. List your service providers (individuals and/or companies).
3. Set rates, availability, and participation preferences.
4. Commit and push.

## File Structure

```yaml
version: 1

service_providers:
  - type: "individual"
    github: "alice"
    currency: "usd"
    hourly_rate: 150
    weekly_commitment: 10
    services:
      - type: "support"
        sub_services:
          - name: "Bug Fixes"

  - type: "company"
    company:
      name: "Acme GmbH"
      country: "DE"
    currency: "eur"
    hourly_rate: 200
    members:
      - github: "bob"
        weekly_commitment: 20

minimum_giveback:
  - type: "project_fund"
    min_percent: 15
  - type: "dependencies_fund"
    min_percent: 10
```

## Fields

### Top-level

| Field               | Required | Description                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------- |
| `version`           | Yes      | Schema version. Currently `1`.                                          |
| `service_providers` | No       | Individuals or companies who offer paid services.                       |
| `minimum_giveback`  | No       | Minimum percentage each service provider must redistribute (see below). |

### Service Provider

A service provider is either an **individual** (a freelancer) or a **company** (with multiple members).

#### Individual

| Field               | Required | Description                                                       |
| ------------------- | -------- | ----------------------------------------------------------------- |
| `type`              | Yes      | Must be `"individual"`.                                           |
| `github`            | Yes      | GitHub username.                                                  |
| `currency`          | Yes      | Preferred currency for rates.                                     |
| `hourly_rate`       | Yes      | Default hourly rate (1-1000).                                     |
| `weekly_commitment` | Yes      | Hours per week available for paid work (1-80).                    |
| `participation`     | No       | How they participate in the project's economy.                    |
| `contact`           | No       | How enterprises can reach this service provider.                  |
| `company`           | No       | Personal company or sole proprietorship (see Company Info below). |
| `compliance`        | No       | Professional commitments they're willing to sign.                 |
| `giveback`          | No       | Override the project's minimum giveback with higher percentages.  |
| `services`          | No       | List of service categories offered.                               |

#### Company

| Field         | Required | Description                                                      |
| ------------- | -------- | ---------------------------------------------------------------- |
| `type`        | Yes      | Must be `"company"`.                                             |
| `company`     | Yes      | Company details (see Company Info below).                        |
| `currency`    | Yes      | Default currency for the company's rates.                        |
| `hourly_rate` | Yes      | Default hourly rate for the company (1-1000).                    |
| `members`     | Yes      | List of people who deliver services under this company.          |
| `contact`     | No       | How enterprises can reach this company.                          |
| `compliance`  | No       | Professional commitments the company is willing to sign.         |
| `giveback`    | No       | Override the project's minimum giveback with higher percentages. |
| `services`    | No       | List of service categories offered.                              |

#### Company Member

| Field               | Required | Description                                          |
| ------------------- | -------- | ---------------------------------------------------- |
| `github`            | Yes      | GitHub username.                                     |
| `weekly_commitment` | Yes      | Hours per week available (1-80).                     |
| `hourly_rate`       | No       | Override the company's default rate for this member. |

#### Company Info

Used by both individual (optional) and company (required) service providers.

| Field     | Required | Description                                                |
| --------- | -------- | ---------------------------------------------------------- |
| `name`    | Yes      | Legal name of the company or entity.                       |
| `tax_id`  | No       | VAT or tax identification number.                          |
| `country` | Yes      | Country code (ISO 3166-1 alpha-2, e.g., `CH`, `US`, `DE`). |
| `address` | No       | Physical address of the entity.                            |

### Participation

Each field accepts: `yes`, `maybe_later`, or `not_interested`. All fields are optional.

| Field                 | Description                                                                       |
| --------------------- | --------------------------------------------------------------------------------- |
| `service_provider`    | Offers paid professional services (support, consulting, development).             |
| `funded_maintainer`   | Accepts shared revenue from the project's common pot to sustain maintenance work. |
| `community_supporter` | Accepts community sponsorships and donations.                                     |

### Contact

How enterprises can reach the service provider. All fields are optional.

| Field      | Description                                          |
| ---------- | ---------------------------------------------------- |
| `email`    | Contact email address.                               |
| `website`  | Personal or company website.                         |
| `calendar` | Booking link for meetings (e.g., Cal.com, Calendly). |
| `discord`  | Discord username or invite link.                     |
| `slack`    | Slack workspace link.                                |
| `linkedin` | LinkedIn profile URL.                                |
| `twitter`  | Twitter/X handle or URL.                             |

### Compliance

All fields are optional booleans (default `false`). These help companies filter service providers who meet their procurement requirements.

| Field                    | Description                                         |
| ------------------------ | --------------------------------------------------- |
| `nda`                    | Willing to sign a Non-Disclosure Agreement.         |
| `dpa`                    | Willing to sign a Data Processing Agreement (GDPR). |
| `security_clearance`     | Has or can obtain security clearance.               |
| `professional_insurance` | Carries professional liability insurance.           |

### Service

| Field          | Required | Description                                     |
| -------------- | -------- | ----------------------------------------------- |
| `type`         | Yes      | Service category (see allowed values below).    |
| `sub_services` | Yes      | List of specific services within this category. |

### Sub-service

| Field           | Required | Description                                                                |
| --------------- | -------- | -------------------------------------------------------------------------- |
| `name`          | Yes      | Service name (must match an allowed value, or any name for `custom` type). |
| `hourly_rate`   | No       | Override the default rate for this specific service.                       |
| `response_time` | No       | Guaranteed response time for this service.                                 |
| `comment`       | No       | Free-text description or notes about the service.                          |

## Allowed Values

### `currency`

| Value | Currency      |
| ----- | ------------- |
| `usd` | US Dollar     |
| `eur` | Euro          |
| `gbp` | British Pound |
| `chf` | Swiss Franc   |

### `type` (service categories)

| Value                     | Description                                                        |
| ------------------------- | ------------------------------------------------------------------ |
| `support`                 | Bug fixes, new features, code maintenance                          |
| `development`             | Technical assistance, deployment guidance, customer support        |
| `advisory`                | Architecture design, technology assessment, security & performance |
| `security_and_compliance` | Incident response, proactive monitoring, 24/7 supervision          |
| `custom`                  | Any service not covered by the above categories                    |

### Sub-service names by category

#### `support`

- `Bug Fixes`
- `New Features`
- `Code Maintenance`

#### `development`

- `Technical Assistance`
- `Deployment Guidance`
- `Customer Support`

#### `security_and_compliance`

- `Incident Response`
- `Proactive Monitoring`
- `24/7 Supervision`

#### `advisory`

- `Architecture Design`
- `Technology Assessment`
- `Security & Performance`

#### `custom`

Any name — describe the service you offer.

### `response_time`

| Value            | Meaning                     |
| ---------------- | --------------------------- |
| `none`           | No guaranteed response time |
| `4_hours`        | 4 hours                     |
| `12_hours`       | 12 hours                    |
| `1_business_day` | 1 business day              |
| `2_business_day` | 2 business days             |
| `3_business_day` | 3 business days             |
| `4_business_day` | 4 business days             |
| `5_business_day` | 5 business days             |
| `7_business_day` | 7 business days             |

## Revenue Redistribution

Revenue redistribution works in two layers:

1. **`minimum_giveback`** (project-level) — The baseline contribution decided collectively by the community. Every service provider must redistribute **at least** these percentages. The remainder goes to the service provider.
2. **`giveback`** (per-service-provider) — Individual service providers can choose to give back **more** than the minimum. They must meet or exceed each `minimum_giveback` value.

### Recipient types

| Type                | Description                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| `project_fund`      | This project's common pot / shared treasury.                                                        |
| `dependencies_fund` | A shared fund that flows to upstream dependencies.                                                  |
| `external`          | An external entity — a foundation, a fiscal host like Open Collective, etc. Requires a `url` field. |

### Project-level minimum (`minimum_giveback`)

The floor that all service providers must respect. The sum of `min_percent` values must not exceed 100.

```yaml
minimum_giveback:
  - type: "project_fund"
    min_percent: 15
  - type: "dependencies_fund"
    min_percent: 10
  - type: "external"
    url: "https://opencollective.com/my-project"
    min_percent: 5
# Total: 30% minimum — service provider keeps at least 70%
```

### Per-provider override (`giveback`)

Service providers can give more than the minimum. Each `percent` must be >= the corresponding `min_percent` from `minimum_giveback`.

```yaml
service_providers:
  # Alice gives more than the minimum
  - type: "individual"
    github: "alice"
    currency: "eur"
    hourly_rate: 200
    weekly_commitment: 20
    giveback:
      - type: "project_fund"
        percent: 20 # Above the 15% minimum
      - type: "dependencies_fund"
        percent: 15 # Above the 10% minimum
      - type: "external"
        url: "https://linuxfoundation.org"
        percent: 5 # Meets the 5% minimum
      # Total: 40% — Alice keeps 60%

  # Acme company also gives more
  - type: "company"
    company:
      name: "Acme GmbH"
      country: "DE"
    currency: "eur"
    hourly_rate: 200
    members:
      - github: "bob"
        weekly_commitment: 20
    giveback:
      - type: "project_fund"
        percent: 25 # Well above the 15% minimum
      - type: "dependencies_fund"
        percent: 10 # Meets the 10% minimum
      # Total: 35% — Acme keeps 65%
```

If a service provider doesn't define `giveback`, the `minimum_giveback` values apply automatically.

### No redistribution

If the project doesn't require any redistribution, simply omit `minimum_giveback`:

```yaml
version: 1

service_providers:
  - type: "individual"
    github: "alice"
    currency: "usd"
    hourly_rate: 150
    weekly_commitment: 10
# No minimum_giveback → 100% goes to the service provider
```

## Full Example

```yaml
version: 1

service_providers:
  # Individual freelancer with a personal company
  - type: "individual"
    github: "alice"
    currency: "eur"
    hourly_rate: 200
    weekly_commitment: 20
    participation:
      service_provider: "yes"
      funded_maintainer: "yes"
      community_supporter: "maybe_later"
    company:
      name: "Alice Consulting"
      tax_id: "CHE-123.456.789"
      country: "CH"
    compliance:
      nda: true
      dpa: true
    giveback: # Alice gives more than the minimum
      - type: "project_fund"
        percent: 20
      - type: "dependencies_fund"
        percent: 15
    services:
      - type: "support"
        sub_services:
          - name: "Bug Fixes"
            response_time: "1_business_day"
          - name: "New Features"

  # Company with multiple maintainers (uses minimum_giveback defaults)
  - type: "company"
    company:
      name: "Acme Open Source GmbH"
      tax_id: "DE123456789"
      country: "DE"
      address: "Hauptstrasse 1, 10115 Berlin"
    currency: "eur"
    hourly_rate: 200
    compliance:
      nda: true
      dpa: true
      professional_insurance: true
    members:
      - github: "bob"
        weekly_commitment: 20
      - github: "carol"
        weekly_commitment: 10
        hourly_rate: 180
    services:
      - type: "development"
        sub_services:
          - name: "Technical Assistance"
            response_time: "4_hours"
      - type: "advisory"
        sub_services:
          - name: "Architecture Design"

minimum_giveback:
  - type: "project_fund"
    min_percent: 15
  - type: "dependencies_fund"
    min_percent: 10
  - type: "external"
    url: "https://opencollective.com/my-project"
    min_percent: 5
```

## Minimal Example

The smallest valid `.ose.yml`:

```yaml
version: 1

service_providers:
  - type: "individual"
    github: "your-github-login"
    currency: "usd"
    hourly_rate: 100
    weekly_commitment: 5
```
