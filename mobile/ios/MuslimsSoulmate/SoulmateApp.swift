import SwiftUI
import WebKit
import SafariServices
@main struct SoulmateApp: App { var body: some Scene { WindowGroup { ContentView() } } }
struct ContentView: View {
 @State private var web = WKWebView(frame: .zero, configuration: WKWebViewConfiguration())
 private let home = URL(string: "https://muslims-soulmate.ayhusse1.chatgpt.site")!
 var body: some View { VStack(spacing:0) { HStack { Text("Muslims Soulmate · Beta").font(.headline).foregroundStyle(Color(red:0.34,green:0.2,blue:0.37));Spacer();Button("Reload"){web.reload()};Link("Browser",destination:home) }.padding(12);SoulmateWebView(web:web,url:home) }.background(Color.white) }
}
struct SoulmateWebView: UIViewRepresentable {
 let web: WKWebView;let url: URL
 func makeCoordinator()->Coordinator { Coordinator() }
 func makeUIView(context:Context)->WKWebView {web.navigationDelegate=context.coordinator;web.uiDelegate=context.coordinator;web.isOpaque=false;web.backgroundColor = .white;web.load(URLRequest(url:url));return web}
 func updateUIView(_ view:WKWebView,context:Context){}
 class Coordinator:NSObject,WKNavigationDelegate,WKUIDelegate {
  let host="muslims-soulmate.ayhusse1.chatgpt.site"
  func webView(_ webView:WKWebView,decidePolicyFor navigationAction:WKNavigationAction,decisionHandler:@escaping(WKNavigationActionPolicy)->Void){guard let url=navigationAction.request.url,url.scheme=="https" else {decisionHandler(.cancel);return};let allowed=[host,"chatgpt.com","auth.openai.com","auth0.openai.com"];if let h=url.host,allowed.contains(h){decisionHandler(.allow)}else{UIApplication.shared.open(url);decisionHandler(.cancel)}}
  func webView(_ webView:WKWebView,createWebViewWith configuration:WKWebViewConfiguration,for navigationAction:WKNavigationAction,windowFeatures:WKWindowFeatures)->WKWebView?{if let url=navigationAction.request.url,url.scheme=="https"{if url.host==host{webView.load(URLRequest(url:url))}else{UIApplication.shared.open(url)}};return nil}
  func webView(_ webView:WKWebView,requestMediaCapturePermissionFor origin:WKSecurityOrigin,initiatedByFrame frame:WKFrameInfo,type:WKMediaCaptureType,decisionHandler:@escaping(WKPermissionDecision)->Void){guard origin.protocol=="https",origin.host==host,webView.url?.host==host else {decisionHandler(.deny);return};decisionHandler(.prompt)}
 }
}
