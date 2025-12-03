---
title: "Glossary"
category: "Basics"
id: "source/rtd_pages/glossary"
---

orphan  

# Glossary

<div id="address">

<div id="addresses">

Address  
A Zcash address is similar to a physical address or an email address. It
is the only information you need to provide for someone to send you
[ZEC](#ZEC). There are two types of addresses in Zcash: a [shielded
address](#shielded address) and a [transparent
address](#transparent address).

</div>

</div>

<div id="block">

<div id="blocks">

Block  
A block is a record in the Zcash blockchain that contains a set of
transactions sent on the network. Pending inclusion in a block, a
transaction is kept in the [mempool](#mempool) in an
[unconfirmed](#unconfirmed) state. Roughly every 2.5 minutes, on
average, a new block is appended to the [blockchain](#blockchain)
through [mining](#mining) and the transactions included receive their
first [confirmation](#confirmation).

</div>

</div>

<div id="block reward">

<div id="block rewards">

Block reward  
A block reward is new [ZEC](#ZEC) released into the network after the
successful [mining](#mining) of a block. For the first four years, the
block reward in Zcash is split into a <span class="title-ref">miners'
reward</span> and a <span class="title-ref">founders' reward</span>.
During this time, miners receive 80% (or 10 [ZEC](#ZEC)) per block with
the remaining 20% (or 2.5 ZEC) split between a range of beneficiaries
including an [Electric Coin Company](_Zcash%20Company:) strategic
reserve, the [Zcash Foundation](#Zcash Foundation) and many stakeholders
including Zcash founders, employees, investors and advisors. After
850,000 [blocks](#blocks), the block reward halves for the first time
and miners start to receive 100% of the block reward (6.25 ZEC). Each
subsequent 840,000 blocks triggers a new block reward halving.

</div>

</div>

<div id="blockchain">

Blockchain  
The blockchain is a public record of Zcash transactions in chronological
order. The blockchain is shared between all Zcash users. It is used to
verify the permanence of Zcash transactions and to prevent [double
spending](#double spending).

</div>

<div id="confirmed">

<div id="unconfirmed">

<div id="confirmation">

<div id="confirm">

Confirmation  
A transaction confirmation first occurs when that transaction has been
included in a [block](#block) and gains an additional confirmation for
each subsequent block. The more confirmations a transaction has, the
higher the security from a potential reversal (see:
[rollback](#rollback)). Some may consider a single confirmation to be
secure for low value transactions, although it is generally recommended
to wait for 10+ confirmations.

</div>

</div>

</div>

</div>

<div id="cryptography">

Cryptography  
Cryptography is the branch of mathematics that lets us create
mathematical proofs that provide high levels of security and privacy.
Services like online commerce and banking already use cryptography and
in many countries, are required by law to protect customers and their
data. In the case of Zcash, cryptography is used to:

1.  protect user privacy (via [zk-SNARKs](#zk-SNARKs))
2.  make it impossible for anybody to spend funds from another user's
    wallet
3.  prevent corruption of the blockchain database

Electric Coin Company  
This is the abbreviation for the Electric Coin Company, the team behind
the [Zcash protocol](#Zcash protocol), previously known as the Zcash
Company.

</div>

<div id="encrypted memo">

Encrypted memo  
The encrypted memo is an additional field for
[transactions](#transactions) sent to [shielded
addresses](#shielded addresses) that is visible to the recipient of a
payment. The encrypted memo is visible only the to the sender and
recipient, unless the [viewing key](#viewing key) or [payment
disclosure](#payment disclosure) gets shared with a third party.

</div>

<div id="equihash">

Equihash  
Equihash is a proof-of-work [mining](#mining) algorithm that is
memory-oriented with very efficient verification.

</div>

<div id="experimental feature">

Experimental feature  
An experimental feature is one that is available to users on the main
[Zcash network](#Zcash network) but should undergo further testing by
users and developers. Users must explicitly opt into enabling an
experimental feature until they become fully supported.

</div>

<div id="double spend">

<div id="double spent">

<div id="double spending">

Double spend  
A double spend happens when a user sends the same [ZEC](#ZEC) to two
different recipients. Zcash [miners](#miners), the Zcash
[blockchain](#blockchain) and [zk-SNARKs](#zk-SNARKs) are integral for
only allowing one transaction to [confirm](#confirm) and be considered
valid.

</div>

</div>

</div>

<div id="mempool">

<div id="memory pool">

Memory pool  
The memory pool (or <span class="title-ref">mempool</span> for short) is
a temporary staging location for [transactions](#transactions) which
have been verified by nodes in the [Zcash network](#Zcash network) but
have not yet been included in a [block](#block). Transactions in the
memory pool are considered [unconfirmed](#unconfirmed).

</div>

</div>

<div id="mining">

<div id="miners">

<div id="mined">

Mining  
Mining is the process where for each [block](#block), nodes in the Zcash
network compete by doing complex mathematical calculations to find a
solution based on a self-adjusting difficulty. Zcash miners are rewarded
with both the [transaction fees](#transaction fees) of the
[transactions](#transactions) they confirm and [block
rewards](#block rewards). Zcash uses a proof-of-work mining algorithm
called [Equihash](#equihash).

</div>

</div>

</div>

<div id="multisig">

Multi-signature  
A multi-signature address (also referred to as
<span class="title-ref">multisig</span>) is a type of
[address](#address) which requires multiple [private key](#private key)
[signatures](#signatures) in order to spend funds. This is a security
mechanism to protect against theft or loss of a private key. Currently,
multisig functionality is only supported by [transparent
addresses](#transparent addresses).

</div>

<div id="network upgrade">

<div id="network upgrades">

Network upgrade  
A network upgrade is a
<span class="title-ref">software-updates-required</span> release of the
Zcash software. After [activation](#activation) of a network upgrade,
network nodes running older versions that are not compatible with the
upgrade will be forked onto an outdated [blockchain](#blockchain) and
will require a software upgrade to rejoin the main network. This is
sometimes referred to as a <span class="title-ref">hard fork</span>
upgrade.

</div>

</div>

<div id="Overwinter">

Overwinter  
Overwinter is the first [network upgrade](#network upgrade) for Zcash.
Its purpose is strengthening the protocol for future network upgrades.
It includes versioning, replay protection for network upgrades,
performance improvements for transparent transactions and the
[transaction expiry](#transaction expiry) feature. Overwinter
[activated](#activated) at [block](#block) height 347500.

</div>

<div id="payment disclosure">

Payment disclosure  
A payment disclosure is a method of proving that a payment was sent to a
[shielded address](#shielded address) by revealing the value, receiving
address and optional [encrypted memo](#encrypted memo). The current
implementation of this is as an [experimental
feature](#experimental feature).

</div>

<div id="private key">

<div id="private key(s)">

Private Key  
A private key is a secret string of data that gives access to spend the
[ZEC](#ZEC) balance of an associated [address](#address) through a
cryptographic [signature](#signature). Your private key(s) may be stored
directly in your computer or smartphone, with a custodian such as an
exchange or a combination of both using [multisig](#multisig). Private
keys are important to keep safe as they are the only access to spending
the funds you may own. For securing your private keys with the zcashd
client, review the `wallet_backup`.

</div>

</div>

<div id="public parameters">

Public parameters  
The Zcash public parameters are a set of global constraints required for
constructing and verifying the [zk-SNARKs](#zk-SNARKs) used for
[shielded addresses](#shielded addresses).

</div>

<div id="rollback">

Rollback  
A rollback is when a blockchain is rewound to a previous state and a set
of the most recent [blocks](#blocks) and the
[transactions](#transactions) they contain are discarded. Zcash has a
rollback limit of 100 blocks.

</div>

<div id="sapling">

Sapling  
Sapling is a [network upgrade](#network upgrade) that introduces
significant efficiency improvements for shielded transactions that will
pave the way for broad mobile, exchange and vendor adoption of Zcash
shielded addresses. Sapling is scheduled to [activate](#activate) at
[block](#block) height 419200.

</div>

<div id="selective disclosure">

Selective disclosure  
Selective disclosure refers to the features of [shielded
addresses](#shielded addresses) where the owner may
<span class="title-ref">selectively disclose</span> shielded transaction
data. A user may share a [viewing key](#viewing key) or [payment
disclosure](#payment disclosure) with any third party, allowing them to
access shielded data while maintaining privacy from others.

</div>

<div id="zaddr">

<div id="shielded address">

<div id="shielded addresses">

Shielded address  
A shielded [address](#address) (also referred to as a
<span class="title-ref">zaddr</span>) sends or receives
[transactions](#transactions) such that the address, associated value
and [encrypted memo](#encrypted memo) are not visible on the Zcash
[blockchain](#blockchain). These addresses start with the letter
<span class="title-ref">z</span>. A shielded address uses
[zk-SNARKs](#zk-SNARKs) to protect transaction data for value sent or
received to it. A transaction consisting of only shielded addresses is
called a [shielded transaction](#shielded transaction). A transaction
consisting of both shielded addresses and [transparent
addresses](#transparent addresses) only protects the data associated
with the shielded address. Each shielded address has a [spending
key](#spending key) and [viewing key](#viewing key).

</div>

</div>

</div>

<div id="shielded transaction">

Shielded transaction  
A shielded transaction is a transaction exclusively between [shielded
addresses](#shielded addresses). The addresses, value and optional
[encrypted memo](#encrypted memo) are shielded using
[zk-SNARK](#zk-SNARK) [cryptography](#cryptography) before the
transaction is recorded in the [blockchain](#blockchain).

</div>

<div id="signature">

<div id="signatures">

Signature  
A cryptographic signature is a mathematical scheme that allows someone
to authenticate digital information. When your Zcash [wallet](#wallet)
signs a transaction with the appropriate [private key](#private key),
the network can confirm that the signature matches the [ZEC](#ZEC) being
spent. This signing is confirmed publicly for [transparent
addresses](#transparent addresses) and through the use of
[zk-SNARKs](#zk-SNARKs) for [shielded addresses](#shielded addresses).

</div>

</div>

<div id="hash rate">

<div id="solution rate">

<div id="Sol/s">

Sol/s  
Sol/s refers to solutions per second and measures the rate at which
[Equihash](#equihash) solutions are found. Each one of those solutions
is tested against the current target (after adding to the block header
and hashing), in the same way that in Bitcoin each nonce variation is
tested against the target.

</div>

</div>

</div>

<div id="spending key">

Spending key  
A spending key is a type of [private key](#private key) that allows any
user in possession of it to spend the balance of the associated
[address](#address). For [shielded addresses](#shielded addresses),
possessing the spending key also allows the user to view the address'
balance and [transaction](#transaction) data.

</div>

<div id="Sprout">

Sprout  
Sprout is the first version of Zcash, launched on October 28, 2016.

</div>

<div id="TAZ">

TAZ  
TAZ is the three letter code for the valueless Zcash [testnet](#testnet)
currency.

</div>

<div id="testnet">

Testnet  
The Zcash testnet is an alternative [blockchain](#blockchain) that
attempts to mimic the main [Zcash network](#Zcash network) for testing
purposes. Testnet coins (sometimes referred to as [TAZ](#TAZ)) are
distinct from actual [ZEC](#ZEC) and do not have value. Developers and
users can experiment with the testnet without having to use valuable
currency. The testnet is also used to test [network
upgrades](#network upgrades) and their [activation](#activation) before
committing to the upgrade on the main [Zcash network](#Zcash network).

</div>

<div id="transaction">

<div id="transactions">

Transaction  
A transaction is a payment between users. They are locally created by
the user or service then submitted to the [Zcash
network](#Zcash network) for verification by nodes and eventual
[confirmation](#confirmation) into a [block](#block).

</div>

</div>

<div id="transaction expiry">

<div id="transaction expires">

Transaction expiry  
A transaction expires after staying [unconfirmed](#unconfirmed) in the
[mempool](#mempool) for too long and is discarded. Once a transaction
expires, it may be resubmitted to the network or a new transaction may
be submitted in its place. The default expiry in Zcash is 20
[blocks](#blocks).

</div>

</div>

<div id="transaction fee">

<div id="transaction fees">

Transaction fee  
A transaction fee is an additional value added to a
[transaction](#transaction) used to incentivize [miners](#miners) to
include the transaction into a [block](#block). Transactions with low or
no fee may still be mined but transactions with the default fee or
higher will be preferred. If a transaction has too low of a fee, it may
stay in the [mempool](#mempool) until the [transaction
expires](#transaction expires). The fee value is not protected for
transactions containing [shielded addresses](#shielded addresses) and
therefore it is recommended to always use the default fee of
<span class="title-ref">.0001 ZEC</span>. Unique fees may result in loss
of privacy in some cases.

</div>

</div>

<div id="taddr">

<div id="transparent address">

<div id="transparent addresses">

Transparent address  
A transparent [address](#address) (also referred to as a
<span class="title-ref">taddr</span>) sends or receives
[transactions](#transactions) such that the address and associated value
are publicly recorded on the Zcash [blockchain](#blockchain). These
addresses start with the letter <span class="title-ref">t</span>. A
transparent address does not use [zk-SNARKs](#zk-SNARKs) to protect
transaction data for value sent or received to it. A transaction
consisting of only transparent addresses reveals the entire transaction.
A transaction consisting of both transparent addresses and [shielded
addresses](#shielded addresses) only reveals the data associated with
the transparent address.

</div>

</div>

</div>

<div id="transparent transaction">

Transparent transaction  
A transparent transaction is a transaction exclusively between
[transparent addresses](#transparent addresses). The addresses and value
are recorded publicly on the [blockchain](#blockchain).

</div>

<div id="upgrade activation">

<div id="activation">

<div id="activate">

<div id="activated">

Upgrade activation  
An upgrade activation is a specific [block](#block) height that triggers
a [network upgrade](#network upgrade).

</div>

</div>

</div>

</div>

<div id="viewing key">

Viewing key  
A viewing key is a type of [private key](#private key) that allows any
user in possession of it to view the balance and transaction data of the
associated [shielded address](#shielded address).

</div>

<div id="wallet">

Wallet  
A Zcash wallet contains [private key(s)](#private key(s)) which allow
the owner to spend the [ZEC](#ZEC) balance it contains. Each Zcash
wallet can show you the total balance of all [ZEC](#ZEC) it controls and
lets you pay a specific amount to a specific [address](#address), just
like a real wallet you keep in your pocket or purse. This is different
to credit cards where customers are charged by the merchant.

</div>

<div id="Zcash network">

Zcash network  
The Zcash network is a <span class="title-ref">peer-to-peer</span>
network of nodes where each node may interact directly with the others
for broadcasting newly submitted [transactions](#transactions),
[mined](#mined) [blocks](#blocks) and various other messages that
regulate behavior. This type of structure removes the need for a trusted
regulating central party.

</div>

<div id="Zcash protocol">

Zcash  
Zcash is an in-production cryptocurrency implementation of the Zerocash
protocol, with security fixes and improvements to performance and
functionality. It bridges the existing transparent payment scheme used
by Bitcoin with a <span class="title-ref">shielded</span> payment scheme
secured by [zk-SNARKs](#zk-SNARKs). It implements the
[Equihash](#equihash) proof-of-work [mining](#mining) algorithm. Both
the network and the associated currency are referred to as
<span class="title-ref">Zcash</span> with [ZEC](#ZEC) referring
specifically to the currency.

</div>

<div id="Zcash Foundation">

Zcash Foundation  
The Zcash Foundation is a 501(c)3 non-profit dedicated to building
Internet payment and privacy infrastructure for the public good,
primarily serving the users of the Zcash protocol and blockchain.

</div>

<div id="ZEC">

ZEC  
ZEC is the three letter currency code for the Zcash cryptocurrency. It
is also used to help distinguish the [Zcash network](#Zcash network)
from the currency. Note that some exchanges use
<span class="title-ref">XZC</span> as the Zcash currency code to conform
with the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#X_currencies)
standard for currencies and similar assets not associated with a nation.

</div>

<div id="Zerocash">

Zerocash  
Zerocash is a cryptographic protocol invented by Eli Ben-Sasson,
Alessandro Chiesa, Christina Garman, Matthew Green, Ian Miers, Eran
Tromer, and Madars Virza in 2014. It improves on the earlier
[Zerocoin](#Zerocoin) protocol developed by some of the same authors
both in functionality and efficiency.

</div>

<div id="Zerocoin">

Zerocoin  
Zerocoin is a cryptographic protocol invented by Ian Miers, Christina
Garman, Matthew Green, and Aviel D. Rubin in 2013. It is a less
efficient predecessor of [Zerocash](#Zerocash).

</div>

<div id="zk-SNARKs">

<div id="zk-SNARK">

zk-SNARKs  
A zk-SNARK is a particular form of zero-knowledge proof used in the
[Zcash protocol](#Zcash protocol) which allows [shielded
addresses](#shielded addresses) to prove the validity of associated
[transactions](#transactions) without revealing the [address](#address)
or value transacted. For Bitcoin and [transparent
addresses](#transparent addresses), [miners](#miners) can verify that a
transaction has not been [double spent](#double spent) because the
addresses and their balances are publicly visible within transactions.
zk-SNARKs allow this same double spend protection for shielded
addresses. The term, which stands for
<span class="title-ref">zero-knowledge Succinct Non-interactive
ARguments of Knowledge</span>, was first used in the
[Zerocash](#Zerocash) whitepaper.

</div>

</div>
