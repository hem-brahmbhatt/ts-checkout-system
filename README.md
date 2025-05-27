# TypeScript Checkout System

A simple checkout system in TypeScript that supports product scanning, basket management, and extensible pricing rules (e.g., bulk discounts, buy-one-get-one-free). Includes full unit tests with Jest.

## Features

- Scan products by code and manage basket quantities
- Extensible pricing rules (bulk discounts, BOGO, etc.)
- Written in strict TypeScript
- Fully tested with Jest

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ required)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd ts-checkout-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Project Structure

```
ts-project/
  src/
    checkout.ts         # Main Checkout class and logic
    checkout.test.ts    # Jest unit tests
  package.json
  tsconfig.json
  jest.config.js
```

## Usage

You can use the `Checkout` class in your TypeScript code:

```typescript
import { Checkout } from './src/checkout';

const checkout = new Checkout([]); // Pass pricing rules here
checkout.scan('SR1');
checkout.scan('FR1');
console.log(checkout.items); // View basket
console.log(checkout.total()); // View total price
```

## Running Tests

This project uses Jest with TypeScript support.

To run all tests:
```bash
npm test
```

## TypeScript

The project is configured with strict type checking. You can compile the code with:
```bash
npx tsc
```

## Pricing Rules

The system is designed to support rules such as:

- **Bulk Quantity Discount**: Discounted price when buying in bulk.
- **Buy-One-Get-One-Free**: Automatically adds a free item for every one purchased.

You can extend or implement these rules in `src/checkout.ts`.

## License

ISC 