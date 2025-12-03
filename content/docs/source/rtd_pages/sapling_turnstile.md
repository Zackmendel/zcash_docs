---
title: "Sprout-to-Sapling Migration"
category: "Development"
id: "source/rtd_pages/sapling_turnstile"
---

orphan  

# Sprout-to-Sapling Migration

## Overview

The Sapling network upgrade requires a new type of shielded address to
support the new usability and security improvements it brings to Zcash.
Sapling shielded addresses start with "zs" whereas the legacy, Sprout
shielded addresses start with "zc".

The Sprout-to-Sapling migration is an upgrade strategy for funds left in
Sprout addresses.

<div class="note">

<div class="title">

Note

</div>

Due to the privacy properties of shielded addresses (both Sprout and
Sapling), direct auditing of the total monetary supply is impossible,
[Turnstiles](https://zcash.readthedocs.io/en/latest/rtd_pages/addresses.html#turnstiles)
are a built in feature to monitor value entering and exiting their
associated [value
pools](https://zcash.readthedocs.io/en/latest/rtd_pages/addresses.html#value-pools).
Users may wish to [track the status of value pool
totals](https://zcash.readthedocs.io/en/latest/rtd_pages/addresses.html#checking-the-value-pool-totals).

</div>

<img src="images/turnstile.png" class="align-center" alt="image" />

There are two levels to the migration: user and consensus. The user
level refers to the standard <span class="title-ref">zcashd</span>
payment RPCs such as <span class="title-ref">z_sendmany</span> and
<span class="title-ref">z_mergettoaddress</span> which prohibit any
transaction from being sent directly from a Sprout address to a Sapling
address (and vice versa). For sending between Sprout and Sapling
addresses, users of these RPCs **must** use a transparent address as an
intermediary which will obviously expose the balance being migrated. As
described in `zcash_addresses`, all balance transfers from shielded
addresses to transparent addresses reveal the value and become
associated with those transparent addresses. Transfers from those
transparent addresses back into shielded addresses reshield the value.
This process is shown in the diagram below.

<img src="images/turnstile2.png" class="align-center" alt="image" />

The consensus level mechanism allows a direct Sprout to Sapling
transaction to take place but requires the balance be *passed through*
the transparent value pool (see: `value_pools`) before landing in a
Sapling address, thus exposing the value without a transparent address.
Because this may not be obvious to users (and therefore a privacy risk),
a UX decision was made to limit availability in the standard RPC. A
migration tool is available to make use of this consensus level
mechanism. See `migration_tool` below.

## Migration Tool

As of version 2.0.5-2 of zcashd, a Sprout-to-Sapling migration tool is
available to help users who have funds stored in older Sprout addresses
migrate them to a Sapling addresss. It is **highly recommended** that
all users with funds in Sprout addresses make use of this tool instead
of manual migration.

Since the exposure of the migrated amount potentially compromises the
privacy of users, the tool works by hiding individual migration
transactions among those of all users that are doing the migration at
around the same time.

The tool will migrate funds from any Sprout addresses in the wallet into
a single destination Sapling address. The migration works by creating up
to 5 transactions whenever the blockchain reaches a 500 block height
interval. The transaction amounts are picked according to a random
distribution. The migration will end once the wallet’s Sprout balance is
below .01 ZEC.

The full design of the tool is specified in [ZIP
308](https://github.com/zcash/zips/blob/master/zip-0308.rst).

### Using the Migration Tool

Use of the migration tool is implemented in two zcashd RPCs:
`z_setmigration` and `z_getmigrationstatus`.

<div class="note">

<div class="title">

Note

</div>

Before running the tool, you may want to specify a specific destination
address. The default is the Sapling account 0 address (aka the first
address derived from the wallet's master seed). To change this, set
another Sapling address by adding the
`-migrationdestaddress=<SAPLINGADDR>` parameter in
<span class="title-ref">zcash.conf</span>.

</div>

To activate the migration tool, simply run:

``` bash
$ zcash-cli z_setmigration true
```

Or to deactivate:

``` bash
$ zcash-cli z_setmigration false
```

<div class="note">

<div class="title">

Note

</div>

Nodes will need to stay running until all funds have been transferred.
If the node is shut down before completion, you will need to reactivate
the tool when the node has been restarted.

You can also enable migration in
<span class="title-ref">zcash.conf</span> by adding the `-migration`
parameter. This will start the migration automatically on restart. If
the tool is deactivated with the RPC, a restart of zcashd will reenable
it.

</div>

To check the status of migration, run:

``` bash
$ zcash-cli z_getmigrationstatus
```

Which will output the following information:

``` 
{
  "enabled": true|false,                    (boolean) Whether or not migration is enabled
  "destination_address": "zaddr",           (string) The Sapling address that will receive Sprout funds
  "unmigrated_amount": nnn.n,               (numeric) The total amount of unmigrated ZEC
  "unfinalized_migrated_amount": nnn.n,     (numeric) The total amount of unfinalized ZEC
  "finalized_migrated_amount": nnn.n,       (numeric) The total amount of finalized ZEC
  "finalized_migration_transactions": nnn,  (numeric) The number of migration transactions involving this wallet
  "time_started": ttt,                      (numeric, optional) The block time of the first migration transaction as a Unix timestamp
  "migration_txids": [txids]                (json array of strings) An array of all migration txids involving this wallet
}
```

Once the total held in Sprout address is less than 0.01 ZEC, the tool
will disable itself automatically.

## Additional Reading

`arrow-circle-right` [Sapling Addresses & Turnstile
Migration](https://blog.z.cash/sapling-addresses-turnstile-migration/)

`arrow-circle-right` [Anatomy of a Zcash
Transaction](https://blog.z.cash/anatomy-of-zcash/)

`arrow-circle-right` [Transaction
Linkability](https://blog.z.cash/transaction-linkability/)
