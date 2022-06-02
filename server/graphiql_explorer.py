GRAPHIQL_VERSION = "1.0.3"
GRAPHIQL_TEMPLATE = """
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>{{graphiql_html_title}}</title>
    <meta name="robots" content="noindex" />
    <meta name="referrer" content="origin" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }
        
        #graphiql {
            height: 100vh;
        }
        
        .graphiql-container {
            height: 100%;
            display: flex;
        }
        
        .graphiql-wrapper {
            width: calc(100% - 320px);
        }
    </style>
    <link href="//cdn.jsdelivr.net/npm/graphiql@{{graphiql_version}}/graphiql.css" rel="stylesheet" />
    <script src="//cdn.jsdelivr.net/npm/promise-polyfill@8.1.3/dist/polyfill.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/unfetch@4.1.0/dist/unfetch.umd.js"></script>
    <script src="//cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/graphiql@{{graphiql_version}}/graphiql.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/graphiql-explorer@0.6.2/graphiqlExplorer.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/subscriptions-transport-ws@0.9.16/browser/client.js"></script>
    <script src="//cdn.jsdelivr.net/npm/graphiql-subscriptions-fetcher@0.0.2/browser/client.js"></script>
</head>

<body>
    <div id="graphiql">Loading...</div>
    <script>
        // Collect the URL parameters
        var parameters = {};
        window.location.search.substr(1).split('&').forEach(function (entry) {
            var eq = entry.indexOf('=');
            if (eq >= 0) {
                parameters[decodeURIComponent(entry.slice(0, eq))] =
                    decodeURIComponent(entry.slice(eq + 1));
            }
        });
        // Produce a Location query string from a parameter object.
        function locationQuery(params) {
            return '?' + Object.keys(params).filter(function (key) {
                return Boolean(params[key]);
            }).map(function (key) {
                return encodeURIComponent(key) + '=' +
                    encodeURIComponent(params[key]);
            }).join('&');
        }
        // Derive a fetch URL from the current URL, sans the GraphQL parameters.
        var graphqlParamNames = {
            query: true,
            variables: true,
            operationName: true
        };
        var otherParams = {};
        for (var k in parameters) {
            if (parameters.hasOwnProperty(k) && graphqlParamNames[k] !== true) {
                otherParams[k] = parameters[k];
            }
        }
        // Configure the subscription client
        let subscriptionsFetcher = null;
        if ('{{subscription_url}}') {
            let subscriptionsClient = new SubscriptionsTransportWs.SubscriptionClient(
                '{{ subscription_url }}',
                { reconnect: true }
            );
            subscriptionsFetcher = GraphiQLSubscriptionsFetcher.graphQLFetcher(
                subscriptionsClient,
                graphQLFetcher
            );
        }
        var fetchURL = locationQuery(otherParams);
        // Defines a GraphQL fetcher using the fetch API.
        function graphQLFetcher(graphQLParams, opts) {
            return fetch(fetchURL, {
                method: 'post',
                headers: Object.assign(
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    opts && opts.headers,
                ),
                body: JSON.stringify(graphQLParams),
                credentials: 'include',
            }).then(function (response) {
                return response.json();
            });
        }
        // When the query and variables string is edited, update the URL bar so
        // that it can be easily shared.
        function onEditQuery(newQuery) {
            parameters.query = newQuery;
            updateURL();
        }
        function onEditVariables(newVariables) {
            parameters.variables = newVariables;
            updateURL();
        }
        function onEditHeaders(newHeaders) {
            parameters.headers = newHeaders;
            updateURL();
        }
        function onEditOperationName(newOperationName) {
            parameters.operationName = newOperationName;
            updateURL();
        }
        function updateURL() {
            history.replaceState(null, null, locationQuery(parameters));
        }
        
        // function handleToggleExplorer() {}
        // Render <GraphiQL /> into the body.
        function AppComponent() {
            
        }

        ReactDOM.render(
            React.createElement(AppComponent),
            document.getElementById('graphiql')
        );
        
        function trySetSchemaFromGraphiqlToGraphiqlExplorer() {
            setTimeout(function() {
                if (
                    window._graphiql &&
                    window._graphiql.state &&
                    window._graphiql.state.schema
                ) {
                    window.setSchema(window._graphiql.state.schema);
                } else {
                    trySetSchemaFromGraphiqlToGraphiqlExplorer();
                }
            }, 500);
        }
        trySetSchemaFromGraphiqlToGraphiqlExplorer();
    </script>
</body>

</html>
"""