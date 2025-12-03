---
title: "Zcash Integration Guide"
category: "Development"
id: "source/rtd_pages/zig"
---

orphan  

# Zcash Integration Guide

Zcash is based on Bitcoin, and has a superset of functionality, both in
the protocol and the RPC interface. This document describes Zcash
integration into services and products.

## Integration Path

There are two approaches to integrating a service or product with Zcash:
the <span class="title-ref">Bitcoin-compatible</span> approach, and the
<span class="title-ref">Zcash API</span> approach. The
Bitcoin-compatible approach is convenient for deployments that already
use Bitcoin Core, because the API is (almost) identical. Alternatively,
if new integrations are being developed, using the Zcash API may be
simpler for most use-cases.

Services that use the Zcash API can send to and receive from both
z-addrs and t-addrs. One current drawback is that this API does not
support multisig transactions. Services that use the
Bitcoin-compatibility approach can only send or receive to/from t-addrs
which do not provide the privacy features Zcash is known for.

A service that supports both z-addrs and multisig will use the Zcash API
for all transactions except multisig, in which case it will use the
Bitcoin API.

<table>
<thead>
<tr class="header">
<th>Designation</th>
<th>Features to Support</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><blockquote>
<p>Level Description</p>
</blockquote></td>
<td><p>Transparent Transparent Private Encrypted Transactions Multisig
Transactions Memo</p></td>
</tr>
<tr class="even">
<td>======= ===========</td>
<td>============ =========== ============ ===========</td>
</tr>
<tr class="odd">
<td><p>1 Bitcoin- compatible</p></td>
<td><p>Bitcoin API Bitcoin API .. ..</p></td>
</tr>
<tr class="even">
<td><p>2 Zcash API</p></td>
<td><p>Zcash Bitcoin API Zcash Zcash Payment API Payment API Payment
API</p></td>
</tr>
</tbody>
</table>

## Bitcoin API

- Backwards compatible with Bitcoin-Core 0.11.2 with minor modifications
  to JSON output.
- Recommended for: time to market for existing Bitcoin applications,
  familiarity with Bitcoin and multi-sig.

The zcash daemon, <span class="title-ref">zcashd</span>, presents the
same kind of RPC interface as Bitcoin Core, and this interface (see
[Bitcoin RPC
reference](https://bitcoin.org/en/developer-reference#remote-procedure-calls-rpcs))
provides a very similar set of [Bitcoin API
calls](https://bitcoin.org/en/developer-reference#rpc-quick-reference),
which we call the <span class="title-ref">Bitcoin API</span>.
Transactions which only involve transparent addresses can be created
with this API just as for Bitcoin.

This API can be used for advanced Bitcoin transactions, just as in
Bitcoin Core, such as those involving multisig addresses. Multisig
addresses begin with "t3" whereas standard transparent addresses begin
with "t1".

## Zcash Payment API

- For sending both transparent and private payments. Extends the
  existing Bitcoin API with new commands.
- Recommended for: new applications looking to add private transactions
  and encrypted memo field support which do not need multisig.

In addition, <span class="title-ref">zcashd</span> adds the
<span class="title-ref">Payment API</span> (see `payment_api`
reference). This is a high-level API that simplifies the common use
cases of transfers. This API can send from or to both z-addrs and
t-addrs through the `z_sendmany` call.

Example of using curl to make a `z_sendmany` call:

    curl --user "$USER:$PASSWORD" \
      -X POST \
      --data-binary "{ \"jsonrpc\": \"1.0\", \"id\":\"curltest\", \"method\": \"z_sendmany\", \"params\": [\"$FROM_ADDR\", [{\"address\": \"$TO_ADDR\" ,\"amount\": $AMOUNT}]] }" \
      -H "Content-Type: text/plain;" \
      http://127.0.0.1:8232

This API does not yet support advanced Bitcoin transaction types, such
as those involving multisig addresses.

## Contact Us

For assistance with integrating Zcash into your product, send us a
message at <ecosystem@z.cash>.

## References

`arrow-circle-right` `user_guide`

`arrow-circle-right` `payment_api`

`arrow-circle-right` [Bitcoin RPC
reference](https://bitcoin.org/en/developer-reference#remote-procedure-calls-rpcs)
and [Bitcoin API
calls](https://bitcoin.org/en/developer-reference#rpc-quick-reference)

`arrow-circle-right` [Zcash benchmarking site](https://speed.z.cash/)
