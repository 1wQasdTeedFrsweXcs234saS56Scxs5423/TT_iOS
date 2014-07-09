/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  MainViewController.h
//  Sample_google
//
//  Created by ___FULLUSERNAME___ on ___DATE___.
//  Copyright ___ORGANIZATIONNAME___ ___YEAR___. All rights reserved.
//

#import "MainViewController.h"

#import "Reachability.h"


#define SYSTEM_VERSION_EQUAL_TO(v)                  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedSame)
#define SYSTEM_VERSION_GREATER_THAN(v)              ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedDescending)
#define SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(v)  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)
#define SYSTEM_VERSION_LESS_THAN(v)                 ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] == NSOrderedAscending)
#define SYSTEM_VERSION_LESS_THAN_OR_EQUAL_TO(v)     ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedDescending)

@interface NSURLRequest (DummyInterface)
+ (BOOL)allowsAnyHTTPSCertificateForHost:(NSString*)host;
+ (void)setAllowsAnyHTTPSCertificate:(BOOL)allow forHost:(NSString*)host;
@end


@implementation MainViewController


int counter = 0;


- (id)initWithNibName:(NSString*)nibNameOrNil bundle:(NSBundle*)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Uncomment to override the CDVCommandDelegateImpl used
        // _commandDelegate = [[MainCommandDelegate alloc] initWithViewController:self];
        // Uncomment to override the CDVCommandQueue used
        // _commandQueue = [[MainCommandQueue alloc] initWithViewController:self];
    }
    return self;
}


- (id)init
{
    self = [super init];
    if (self) {
        // Uncomment to override the CDVCommandDelegateImpl used
        // _commandDelegate = [[MainCommandDelegate alloc] initWithViewController:self];
        // Uncomment to override the CDVCommandQueue used
        // _commandQueue = [[MainCommandQueue alloc] initWithViewController:self];
    }
    return self;
}

- (void)didReceiveMemoryWarning
{
    // Releases the view if it doesn't have a superview.
    [super didReceiveMemoryWarning];

    // Release any cached data, images, etc that aren't in use.
}

#pragma mark View lifecycle

- (void)viewWillAppear:(BOOL)animated
{
    // View defaults to full size.  If you want to customize the view's size, or its subviews (e.g. webView),
    // you can do so here.

    [super viewWillAppear:animated];
}


- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
    

    
    NSLog(@"one");
  
   
    

    
    
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(checkNetworkStatus:) name:kReachabilityChangedNotification object:nil];
   
    internetReachable = [[Reachability reachabilityForInternetConnection] retain];
    [internetReachable startNotifier];
    
    
    hostReachable = [[Reachability reachabilityWithHostName: @"www.google.com"] retain];
    [hostReachable startNotifier];
    
   // [super.webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@""]]];
    
}



- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
    // e.g. self.myOutlet = nil;
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
    return [super shouldAutorotateToInterfaceOrientation:interfaceOrientation];
}

/* Comment out the block below to over-ride */

/*
- (UIWebView*) newCordovaViewWithFrame:(CGRect)bounds
{
    return[super newCordovaViewWithFrame:bounds];
}
*/

#pragma mark UIWebDelegate implementation

static BOOL isExternalUrlHack = NO;
static NSString *myUserName = @"";

//2.5 webviewdifinish
//- (void)webViewDidFinishLoad:(UIWebView*)theWebView
//{
//    
//    
//    
//    
//    // Black base color for background matches the native apps
//    theWebView.backgroundColor = [UIColor blackColor];
//
//    return [super webViewDidFinishLoad:theWebView];
//}



//Chetan New WebViewDidFinish


- (NSString*) pathForResource:(NSString*)resourcepath;
{
    if ([self.startPage isEqualToString:resourcepath] && [self.startPage hasPrefix:@"https://"]) {
        isExternalUrlHack = YES;
        // return non-nil so it doesn't fail
        
        NSLog(@"pathForResource in IF: %@", resourcepath);
        return resourcepath;
    }
    NSLog(@"pathForResource: %@", resourcepath);
	return [super pathForResource:resourcepath];
}

NSString *strCurrentYpos;

#pragma UIWebDelegate implementation

- (void) webViewDidFinishLoad:(UIWebView*) theWebView
{
    NSLog(@"webViewDidFinishLoad");
    
    
    NSString *urlString = self.webView.request.URL.absoluteString;
    NSRange rangeValue = [urlString rangeOfString:@"www/index.html" options:NSCaseInsensitiveSearch];
    
     NSRange rangeValueOne = [urlString rangeOfString:@"preference" options:NSCaseInsensitiveSearch];
    
    
    // NSLog(@"Range Value: %@",rangeValue.length);
    if(rangeValue.length > 0)
    {
        [self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"setUserInfo('%@')",myUserName]];
    }
    else if(rangeValueOne.length > 0)
    {
       strCurrentYpos = [self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"initPref('%@')",myUserName]];

        //[self.webView stringByEvaluatingJavaScriptFromString:@"initPref()",myUserName];
        NSLog(@"myUserName value : %@", myUserName);
    }

    NSString *udid;
    if (SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(@"6.0"))
        udid = [UIDevice currentDevice].identifierForVendor.UUIDString;
    else
        udid = [UIDevice currentDevice].uniqueIdentifier;
    
    NSLog(@"THIS IS MY UDID %@", udid);
    
    
        [self.webView stringByEvaluatingJavaScriptFromString:[NSString stringWithFormat:@"setUDIDInfo('%@')",udid]];
    
    theWebView.backgroundColor = [UIColor blackColor];
    
	return [super webViewDidFinishLoad:theWebView];
}




- (void) webView:(UIWebView*)theWebView didFailLoadWithError:(NSError*)error
{
    NSLog(@"In didFailWithError:");
    
    if (isExternalUrlHack) {
        // load our external url
        
        NSURL* appURL = [NSURL URLWithString:self.startPage];
        
        NSLog(@"External Hack ------> : %@", appURL);
        NSURLRequest *appReq = [NSURLRequest requestWithURL:appURL cachePolicy:NSURLRequestUseProtocolCachePolicy timeoutInterval:20.0];
        [theWebView loadRequest:appReq];
    }

    return [super webView:theWebView didFailLoadWithError:error];
}

/* Comment out the block below to over-ride */

/*

- (void) webViewDidStartLoad:(UIWebView*)theWebView
{
    return [super webViewDidStartLoad:theWebView];
}

- (void) webView:(UIWebView*)theWebView didFailLoadWithError:(NSError*)error
{
    return [super webView:theWebView didFailLoadWithError:error];
}

- (BOOL) webView:(UIWebView*)theWebView shouldStartLoadWithRequest:(NSURLRequest*)request navigationType:(UIWebViewNavigationType)navigationType
{
    return [super webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType];
}
*/


- (BOOL) webView:(UIWebView*)theWebView shouldStartLoadWithRequest:(NSURLRequest*)request navigationType:(UIWebViewNavigationType)navigationType
{
    
       
	NSLog(@"shouldStartLoadWithRequest");
    
    
    NSArray *urlArr = [[NSArray alloc] init];
     NSLog(@"Inside shouldStartLoadWithRequest-->%@",request.URL.absoluteString);
    
    
    
    urlArr = [request.URL.absoluteString componentsSeparatedByString:@"?"];
    NSLog(@"PAge is  = %@", [urlArr objectAtIndex:0]);

    
    if([urlArr count] > 1)
    {
        NSLog(@"Item1  = %@", [urlArr objectAtIndex:0]);
        NSLog(@"Item2 = %@",[urlArr objectAtIndex:1]);
    }
    
    NSLog(@"URL Array Object at index 0 ------> %@",[urlArr objectAtIndex:0]);

    
    
    if([[urlArr objectAtIndex:0] isEqualToString:@"https://techtime.accenture.com/mobile/authenticated/index.html"])
    {
        NSLog(@"----**&&**-----");
        
        
        NSString *path=[[NSBundle mainBundle] pathForResource :@"index" ofType:@"html" inDirectory:@"www"];
        
        NSLog(@"Path %@", path);
        myUserName = [[NSString alloc] initWithString:[urlArr objectAtIndex:1]];
        NSLog(@"UserName* ---->  %@", myUserName);
        
//        NSLog(@"This is the username -------> %@", myUserName);
        NSLog(@"----INSIDE IF CONDITION-----");
        
        [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
        return YES;
    }else
    {
        NSLog(@"----&**&-----");
        NSLog(@"Call went to Else Part");
        return [ super webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType ];
    }


    
    //return [super webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType];
}




-(void) checkNetworkStatus:(NSNotification *)notice
{

    
        NSLog(@"checknetworkstatus");
   
    
    NetworkStatus internetStatus;
//    if([strCurrentYpos isEqualToString:@"online"])
//    {
    
        internetStatus = [internetReachable currentReachabilityStatus];
//    }
//    else
//    {
//        internetStatus = 0;
//    }
    
    NSLog(@"internetStats: %u ",internetStatus);
    
    switch (internetStatus)
    {
        case NotReachable:
        {
            NSLog(@"The internet is down.");
            // self.internetActive = NO;
            // NSString *path = [super pathForResource:@"index.html"];
            NSString *path=[[NSBundle mainBundle] pathForResource :@"index" ofType:@"html" inDirectory:@"www"];
            [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
            
            
            
            break;
            
        }
        case ReachableViaWWAN:
        case ReachableViaWiFi:
        {
            NSLog(@"The internet is working via WIFI.");
            
            // NSString *urlAddress = @"https://federation-sts.accenture.com/adfs/ls/?wa=wsignin1.0&wtrealm=https%3a%2f%2ftechtime.accenture.com&wctx=rm%3d0%26id%3dpassive%26ru%3d%252f&wct=2013-04-11T12%3a15%3a21Z";
            
            //NSString *urlAddress = @"https://myte.accenture.com";
            //NSString *urlAddress = @"https://techtime.accenture.com/mobile/index.php";
            
            NSString *urlAddress = @"https://federation-sts.accenture.com/adfs/ls/?wa=wsignin1.0&wtrealm=https%3a%2f%2ftechtime.accenture.com&wctx=rm%3d0%26id%3dpassive%26ru%3d%252fmobile%252findex.php";
            
            
            // Use this for Stage 1
            
            //            NSString *urlAddress = @"https://federation-sts-stage.accenture.com/adfs/ls/?wa=wsignin1.0&wtrealm=https%3a%2f%2ftechtime.accenture.com&wctx=rm%3d0%26id%3dpassive%26ru%3d%252fmobile%252findex.php";
            
            
            NSURL *url = [[[NSURL alloc] initWithString:urlAddress] autorelease];
            
            //NSURL *url = [NSURL URLWithString:@"https://techtime.accenture.com/mobile/index.php"];
            [NSURLRequest setAllowsAnyHTTPSCertificate:YES forHost:[url host]];
            
            // [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];
            NSURLRequest *requestObj = [NSURLRequest requestWithURL:url];
           // [self.webView loadRequest:requestObj];
            
            NSString *path=[[NSBundle mainBundle] pathForResource :@"preference" ofType:@"html" inDirectory:@"www"];
            [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:path]]];

            
            
            //NSLog(@"Absolute string url %@ =",self.webView.request.URL.absoluteString);
            //NSLog(@"In View Did Load: %@", self.webView.request.URL.absoluteString);
            
            
            break;
        }
    }

    [[NSNotificationCenter defaultCenter] removeObserver:self];
    
}



@end

@implementation MainCommandDelegate

/* To override the methods, uncomment the line in the init function(s)
   in MainViewController.m
 */

#pragma mark CDVCommandDelegate implementation

- (id)getCommandInstance:(NSString*)className
{
    return [super getCommandInstance:className];
}

/*
   NOTE: this will only inspect execute calls coming explicitly from native plugins,
   not the commandQueue (from JavaScript). To see execute calls from JavaScript, see
   MainCommandQueue below
*/
- (BOOL)execute:(CDVInvokedUrlCommand*)command
{
    return [super execute:command];
}

/*- (NSString*)pathForResource:(NSString*)resourcepath;
{
    return [super pathForResource:resourcepath];
}*/



@end

@implementation MainCommandQueue

/* To override, uncomment the line in the init function(s)
   in MainViewController.m
 */
- (BOOL)execute:(CDVInvokedUrlCommand*)command
{
    return [super execute:command];
}

@end
