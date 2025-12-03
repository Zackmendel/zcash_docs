---
title: "Troubleshooting Guide"
category: "Wallets & Users"
id: "source/rtd_pages/troubleshooting_guide"
---

orphan  

# Troubleshooting Guide

The following is a list of questions for troubleshooting zcashd, the
core Zcash client software. For general FAQ, see
<https://z.cash/support/faq.html>.

## System Requirements

> `linux` 64-bit Linux (easiest with a Debian-based distribution)  
> `th-list` A compiler for C++11 if building from source. Gcc 6.x and
> above has full C++11 support, and gcc 4.8 and above supports some but
> not all features. Zcash will not compile with versions of gcc lower
> than 4.8.  
> `database` At least 4GB of RAM to generate shielded transactions.  
> `database` At least 8GB of RAM to successfully run all of the tests.

Zcash runs on port numbers that are 100 less than the corresponding
Bitcoin port number. They are:

> `plug` `8232` for mainnet RPC  
> `plug` `8233` for mainnet peer-to-peer network  
> `plug` `18232` for testnet RPC  
> `plug` `18233` for testnet peer-to-peer network

## Building from source

If you did not build by running <span class="title-ref">build.sh</span>,
you will encounter errors. Be sure to build with:

`$ ./zcutil/build.sh -j$(nproc)`

<div class="note">

<div class="title">

Note

</div>

If you don't have nproc, then substitute the number of your processors.

</div>

``` bash
Error message: g++: internal compiler error: Killed (program cc1plus) 
```

This means your system does not have enough memory for the building
process and has failed. Please allocate at least 4GB of computer memory
for this process and try again.

``` bash
Error message: 'runtime_error' (or other variable) is not a member of 'std'. compilation terminated due to -Wfatal-errors. ``
```

Check your compiler version and ensure that it support C++11. If you're
using a version of gcc below 4.8.x, you will need to upgrade.

``` bash
Error message: gtest failing with undefined reference ``
```

If you are developing on different branches of Zcash, there may be an
issue with different versions of linked libraries. Try `make clean` and
build again.

## Running zcashd

Trying to start zcashd for the first time, it fails with:

``` bash
could not load param file at /home/rebroad/.zcash-params/sprout-verifying.key
```

You didn't fetch the parameters necessary for zk-SNARK proofs. If you
installed the Debian package, run
<span class="title-ref">zcash-fetch-params</span>. If you built from
source, run <span class="title-ref">./zcutil/fetch-params.sh</span>.

zcashd crashes with the message:

``` bash
``std::bad_alloc`` or ``St13runtime_exception``
```

These messages indicate that your computer has run out of memory for
running zcashd. This will most likely happen with mining nodes which
require more resources than a full node without running a miner. This
can also happen while creating a transaction involving a z-address.
You'll need to allocate at least 4GB memory for these transactions.

## Zcashd commands

To get help with the RPC interface from the command line, use:

- `zcash-cli help`, which lists all zcash-cli commands.
- `zcash-cli help $COMMAND`, which lists details of a specific command.

There is also additional documentation under `payment_api` .

## Restoring from backup

<span class="title-ref">zcash-cli</span> stops responding after using
the command <span class="title-ref">z_importkey</span>

The command has added the key, but your node is currently scanning the
blockchain for any transactions related to that key, causing there to be
a delay before it returns. This immediate rescan is the default setting
for <span class="title-ref">z_importkey</span>, which you can override
by adding <span class="title-ref">false</span> to the command if you
simply want to import the key, i.e. <span class="title-ref">zcash-cli
z_importkey \$KEY false</span>

## Custom transactions

If, when attempting to execute the `sendrawtransaction` RPC method, you
receive the error:

``` bash
AcceptToMemoryPool: absurdly high fees
```

This is most likely caused by not specifying an output address to
receive the change when creating the transaction
(`createrawtransaction`). This RPC call, unlike `sendmany` and
`z_sendmany`, does not do this automatically.

With `createrawtransaction`, the fee is simply the sum of the inputs
minus the sum of the outputs. If this difference is larger than 0.0021
ZEC (210000 zatoshis), the assumption is that this is unintentional, and
the transaction is not sent. If you really do wish to send a transaction
with a large fee, add `true` to the end of the `sendrawtransaction`
command line. This will allow an arbitrarily high fee.

------------------------------------------------------------------------

<div class="admonition">

What if my question isn't answered here?

Hop on the [Zcash Dischord](https://discord.gg/GGtsUzyp) to chat with
ECC, maintainers of zcashd, and community members.

Search the issues section (<https://github.com/zcash/zcash/issues>) to
see if someone else has posted a similar issue and if not, feel free to
report your problem there. Please provide as much information about what
you've tried and what failed so others can properly assess your
situation to help.

</div>

<div class="important">

<div class="title">

Important

</div>

If you have issues with a network upgrade, please see the `nu_dev_guide`

</div>
